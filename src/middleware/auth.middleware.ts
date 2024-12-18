import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error";
import { User } from "../types/user";
import { UserModel } from "../models/user.model";

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

export const checkIfUserExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const results = await UserModel.getUserByEmail(email);
        const user = results[0];
        if (user) {
            throw new ApiError("User already exists", 400);
        }
        next();
    } catch (error) {
        next(error);
    }
}