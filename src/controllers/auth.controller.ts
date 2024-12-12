import { NextFunction, Request, Response } from "express";


export class AuthController {
    static handleGoogleSignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // await AuthService.signInWithGoogle();
        } catch (error) {
            next(error);
        }
    }

    static handleGoogleCallBack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send('Google callback successful');
        } catch (error) {
            next(error);
        }
    }
}