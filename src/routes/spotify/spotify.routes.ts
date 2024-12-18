import { Router } from "express";
import { SpotifyController } from "../../controllers/spotify/spotify.controller";
import { verifyToken } from "../../middleware/auth.middleware";

export const spotifyRoutes = Router();

spotifyRoutes.get("/connect",  SpotifyController.handleConnection);
spotifyRoutes.get("/callback",  SpotifyController.handleCallback);

spotifyRoutes.get("/artists", verifyToken, SpotifyController.handleGetArtists);