import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../utils/api-response";
import { AuthService } from "../../services/auth/auth.service";

export class AuthController {
    static handleSignUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const resp = await AuthService.signUp(data);
            new ApiResponse(201).success('Sign up successful', resp, res);
        } catch (error) {
            next(error);
        }
    }
    static handleSignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const resp = await AuthService.signIn(data);
            new ApiResponse(200).success('Sign in successful', resp, res);
        } catch (error) {
            next(error);
        }
    }
}