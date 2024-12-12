import { ApiError } from "./api-error";
import express from "express";

export const errorHandler = (err: ApiError | Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.errorId = Math.floor(Math.random() * 1000000);
    const errorStatusCode = err instanceof ApiError ? err.statusCode : 500;
    res.locals.errorMessage = err.message;
    res.locals.errorStack = err.stack;
    res.status(errorStatusCode).json({ status: false, errorId: res.locals.errorId, message: err.message });
}