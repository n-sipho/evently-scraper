import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export class AuthController {

    static handleSignUpWithSpotify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await AuthService.createAccount(req.body);
        } catch (error) {
            next(error);
        }
    }

    static handleSpotifyCallback = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.query;
            console.log('code:', code);

            // Handle Spotify callback logic here
        } catch (error) {
            next(error);
        }
    }

    static handleGoogleSignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await AuthService.signInWithGoogle();
        } catch (error) {
            next(error);
        }
    }

    static handleGoogleCallBack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.user);
            // req.session.user = req.user;
            res.send('Google callback successful');
        } catch (error) {
            next(error);
        }
    }
}