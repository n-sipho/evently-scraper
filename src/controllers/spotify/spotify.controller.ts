import { NextFunction, Request, Response } from "express";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { ApiResponse } from "../../utils/api-response";
import { SpotifyModel } from "../../models/spotify.model";
import { decrypt, encrypt } from "../../utils/utils";
import { SpotifyToken } from "../../types/token";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export class SpotifyController {
    static handleConnection = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await SpotifyService.connect(res);
        } catch (error) {
            next(error);
        }
    }
    static handleCallback = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resp = await SpotifyService.connectComplete(req, res);
            new ApiResponse(200).success("Spotify successfuly connected", resp, res);
        } catch (error) {
            next(error);
        }
    }
    static handleGetArtists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resp = await SpotifyService.getArtist(req);
            new ApiResponse(200).success("Artists", resp, res);
        } catch (error) {
            const errorToString = String(error);
            if (!errorToString.includes("expired token")) {
                next(error);
            }

            const user = req.user;
            const userId = user?.id as number;

            const resp = await SpotifyModel.getToken(userId);
            const token = resp[0].token;

            const decryptedData = decrypt(token);
            const accessToken = JSON.parse(decryptedData) as SpotifyToken;

            const newAccessToken = await SpotifyService.refreshToken(accessToken.refresh_token);
            const client_id = process.env.SPOTIFY_ID as string;
            const followedArtists = (await SpotifyApi.withAccessToken(client_id, newAccessToken)
                .currentUser.
                followedArtists())
                .artists.items;

            new ApiResponse(200).success("Artists", followedArtists, res);

            const encryptedToken = encrypt(JSON.stringify(newAccessToken));
            await SpotifyModel.updateToken(encryptedToken, userId);
        }
    }
}