import { Router } from "express";
import passport from "passport";
import { GoogleAuthController } from "../../controllers/auth/google.controller";

export const googleAuthRoutes = Router();

googleAuthRoutes.get(
    "/login",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRoutes.get(
    "/callback",
    passport.authenticate("google"),
    GoogleAuthController.handleGoogleCallBack
);