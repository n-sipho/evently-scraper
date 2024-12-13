import { NextFunction, Request, Response } from "express";


export class GoogleAuthController {
    static handleGoogleCallBack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send('Google callback successful');
        } catch (error) {
            next(error);
        }
    }
}