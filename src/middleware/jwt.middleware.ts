import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error";
import { User } from "../types/user";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            throw new ApiError("Unauthorized", 401);
        }

        const secret = process.env.SECRET as string;
        const decoded = jwt.verify(token, secret) as User;
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};