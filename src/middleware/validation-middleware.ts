import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ApiError } from '../utils/api-error';
import { User } from '../types/user';


export const validateSignin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = loginSchema.validate(req.body);

        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }
        next();
    } catch (error) {
        next(error);
    }
}

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    try {
        const signupSchema = Joi.object<User>({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = signupSchema.validate(req.body);
        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }
        next();
    } catch (error) {
        next(error);
    }
}