import { NextFunction, Request, Response } from "express";
import { SpotifyService } from "../../services/spotify-service";

export class SpotifyController {

    static handleSpotifyConnection = async (req: Request, res: Response, next: NextFunction) => {
        try {
            SpotifyService.connectSpotify(res);
        } catch (error) {

        }
    }

    static handleSpotifyCallback = async (req: Request, res: Response, next: NextFunction) => {
        try {
            SpotifyService.connectSpotifyComplete(req, res);
        } catch (error) {

        }
    }
    static handleSpotifyTokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            SpotifyService.refreshSpotifyToken(req, res);
        } catch (error) {

        }
    }
}