import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app_error";

type JwtPayload = {
    userId: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
        throw new AppError("Não autorizado", 401);
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        throw new AppError("Não autorizado", 401);
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;
    console.log(userId);

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        // include: {
        //     wallet: true,
        // }
    });

    if (!user) {
        throw new AppError("Não autorizado", 401);
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    next();
}