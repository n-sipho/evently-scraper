import { NextFunction, Request, Response } from "express";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { ApiResponse } from "../../utils/api-response";

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
            next(error);
        }
    }
}