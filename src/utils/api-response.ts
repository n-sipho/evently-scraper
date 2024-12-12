import { Response } from "express";

export class ApiResponse {
    statusCode: number;
    constructor(statusCode = 200) {
        this.statusCode = statusCode;
    }

    error = (message: string, res: Response) => {
        return res.status(this.statusCode).json({
            status: false,
            message,
        })
    }

    success = (message: string, data: {}, res: Response) => {
        return res.status(this.statusCode).json({
            status: true,
            message,
            data
        })
    }
}