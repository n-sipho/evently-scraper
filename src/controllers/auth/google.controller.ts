import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../utils/api-response";
import { generateUserToken } from "../../utils/utils";

export class GoogleAuthController {
    static handleGoogleCallBack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (user) {
                const token = generateUserToken(user);
                new ApiResponse(201).success('Google authentication successful', token, res);
            }
        } catch (error) {
            next(error);
        }
    }
}