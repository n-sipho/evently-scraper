import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import passport from "passport";

export const authRoutes = Router();

authRoutes.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
    AuthController.handleGoogleSignIn
);

authRoutes.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    AuthController.handleGoogleCallBack
);