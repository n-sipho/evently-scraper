import { Router } from "express";
import { SpotifyController } from "../../controllers/spotify/spotify.controller";

export const spotifyRoutes = Router();

spotifyRoutes.get("/connect", SpotifyController.handleSpotifyConnection);
spotifyRoutes.get("/callback", SpotifyController.handleSpotifyCallback);
spotifyRoutes.get("/refresh/token", SpotifyController.handleSpotifyTokenRefresh);