import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../utils/api-response";

export class GoogleAuthController {
    static handleGoogleCallBack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            new ApiResponse(201).success('Google authentication successful', user, res);
        } catch (error) {
            next(error);
        }
    }
}