import { Response } from "express";

export class ApiResponse extends Response {
    statusCode: number;
    constructor(statusCode: number, message: string, data: {},) {
        super(message, data);
        this.statusCode = statusCode;
    }
}