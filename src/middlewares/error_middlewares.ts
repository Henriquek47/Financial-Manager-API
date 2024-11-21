import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app_error";

export const errorMiddlewares = (err: Error & Partial<AppError>, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ?? 500;
    const message = err.statusCode ? err.message : "Internal Server Error";
    res.status(statusCode).send({ errors: [{ message: message }] });
}