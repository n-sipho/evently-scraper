import { Router } from "express";
import { validateSignin, validateSignup } from "../../middleware/validation-middleware";
import { checkIfUserExists } from "../../middleware/auth.middleware";
import { AuthController } from "../../controllers/auth/auth.controller";

export const authRoutes = Router();

authRoutes.post("/signup", validateSignup, checkIfUserExists, AuthController.handleSignUp);
authRoutes.get("/signin", validateSignin, AuthController.handleSignIn);

