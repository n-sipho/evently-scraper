import { NextFunction, Request, Response } from "express";
import { SpotifyService } from "../../services/spotify";

export class SpotifyController {

    static handleSpotifyConnection = async (req: Request, res: Response, next: NextFunction) => {
        try {
           await SpotifyService.connectSpotify(res);
        } catch (error) {
            next(error);
        }
    }

    static handleSpotifyCallback = async (req: Request, res: Response, next: NextFunction) => {
        try {
           await SpotifyService.connectSpotifyComplete(req, res);
        } catch (error) {
            next(error);
        }
    }
    static handleSpotifyTokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            SpotifyService.refreshSpotifyToken(req, res);
        } catch (error) {
            next(error);
        }
    }
}