import { Router } from "express";
import { SpotifyController } from "../../controllers/spotify-controller";

export const spotifyRoutes = Router();

spotifyRoutes.get("/spotify/connect", SpotifyController.handleSpotifyConnection);
spotifyRoutes.get("/spotify/callback", SpotifyController.handleSpotifyCallback);
spotifyRoutes.get("/spotify/refresh/token", SpotifyController.handleSpotifyTokenRefresh);