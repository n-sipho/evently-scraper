import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ApiError } from '../utils/api-error';


export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
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
        const signupSchema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone_number: Joi.string().required(),
            address: Joi.string().required(),
            gender: Joi.string().valid('male', 'female').required(),
            type: Joi.string().valid('donor', 'collector').required(),
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