import { Request, Response } from "express";
import querystring from "querystring";
import { generateRandomString } from "../../utils/utils"
import axios from "axios";
import { ApiError } from "../../utils/api-error";

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
    static connectSpotify = async (res: Response) => {
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

    static connectSpotifyComplete = async (req: Request, res: Response) => {
        // your application requests refresh and access tokens
        // after checking the state parameter
        const code = req.query.code || null;
        const state = req.query.state || null;

        const storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            throw new ApiError("State mismatch", 400);
        } else {
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

            await axios
                .post(authOptions.url,
                    authOptions.form,
                    { headers: authOptions.headers }
                )
                .then(response => {
                    if (response.status === 200) {
                        const { access_token, refresh_token } = response.data;
                        // Pass the token to the browser to make requests from there
                        res.redirect('/spotify/callback' +
                            querystring.stringify({
                                access_token: access_token,
                                refresh_token: refresh_token
                            }));
                    } else {
                        throw new ApiError("Invalid token", 400);
                    }
                });
        }
    }

    static refreshSpotifyToken = async (req: Request, res: Response) => {
        const refresh_token = req.query.refresh_token;
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
        };

        axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers })
            .then(response => {
                if (response.status === 200) {
                    const { access_token, refresh_token } = response.data;
                    res.send({
                        access_token: access_token,
                        refresh_token: refresh_token
                    });
                } else {
                    res.status(response.status).send({ error: 'Failed to retrieve tokens' });
                }
            })
            .catch(error => {
                console.error('Error during token retrieval:', error.message);
                res.status(500).send({ error: 'An error occurred during the request' });
            });
    }
}