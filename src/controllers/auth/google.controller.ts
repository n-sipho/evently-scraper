import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../../utils/api-response";

export class GoogleAuthController {
    static handleGoogleCallBack = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            const secret = process.env.SECRET as string;
            if (user) {
                const token = jwt.sign(user, secret);
                new ApiResponse(201).success('Google authentication successful', token, res);
            }
        } catch (error) {
            next(error);
        }
    }
}