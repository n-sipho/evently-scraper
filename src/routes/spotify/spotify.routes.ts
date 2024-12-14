import { Router } from "express";
import { SpotifyController } from "../../controllers/spotify/spotify.controller";

export const spotifyRoutes = Router();

spotifyRoutes.get("/connect", SpotifyController.handleConnection);
spotifyRoutes.get("/callback", SpotifyController.handleCallback);