import { NextFunction, Request, Response } from "express";
import querystring from "querystring";
import { encrypt, generateRandomString } from "../../utils/utils"
import axios from "axios";
import { ApiError } from "../../utils/api-error";
import { SpotifyModel } from "../../models/spotify.model";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { SpotifyToken } from "../../types/token";

const client_id = process.env.SPOTIFY_ID as string; // your clientId
const client_secret = process.env.SPOTIFY_SECRET as string; // Your secret
const stateKey = process.env.SPOTIFY_STATE_KEY as string;
const redirect_uri = 'http://localhost:3000/spotify/callback'; // Your redirect uri
const state = generateRandomString(16);

export class SpotifyService {
    /**
     * connectSpotify()
     * 
     * This function will connect to spotify and return the access token
     */
    static connect = async (res: Response) => {
        res.cookie(stateKey, state);
        const scope = 'user-read-private user-read-email';

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    }
    static connectComplete = async (req: Request, res: Response): Promise<SpotifyToken> => {
        // your application requests refresh and access tokens
        // after checking the state parameter
        const code = req.query.code || null;
        const state = req.query.state || null;

        const storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            throw new ApiError("State mismatch", 400);
        }

        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
        };

        const response = await axios
            .post(authOptions.url, authOptions.form, { headers: authOptions.headers });

        if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            const token = JSON.stringify({
                access_token,
                refresh_token
            });

            const user = req.user;
            if (user) {
                const userId = user.id;
                const encryptedToken = encrypt(token);
                await SpotifyModel.saveToken(encryptedToken, userId);
                return { access_token, refresh_token };
            }

            throw new ApiError("Session expired", 440);
        } else {
            throw new ApiError("Invalid token", response.status);
        }
    }
    static refreshToken = async (refreshToken: string): Promise<SpotifyToken> => {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
        };

        const response = await axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers })
        if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            return {
                access_token: access_token,
                refresh_token: refresh_token
            }
        } else {
            throw new ApiError("Failed to retrieve tokens", response.status);
        }
    }
    static getFollowedArtist = async (req: Request) => {
        const user = req.user;
        if (user) {
            const userId = user.id;
            const resp = await SpotifyModel.getToken(userId);
            const token = resp[0];
            const accessToken = JSON.parse(token);
            const spotifyApi = SpotifyApi.withAccessToken(client_id, accessToken);

            const followedArtists = await spotifyApi.currentUser.followedArtists();
            console.log("FOLLOWED ARTISTS:", followedArtists);

        }

        throw new ApiError("Session expired", 440);
    }
}