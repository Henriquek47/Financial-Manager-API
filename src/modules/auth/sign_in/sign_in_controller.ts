import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import { SignInUseCase } from "./sign_in_use_case";
import { JWT_SECRET } from "../../..";
import jwt from "jsonwebtoken";

export class SignInController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;

        const createUserUseCase = new SignInUseCase();
        const result = await createUserUseCase.execute({ email, password });

        const token = jwt.sign({ userId: result.id }, JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            "response": {
                id: result.id,
                name: result.name,
                email: result.email,
                wallet_id: result.wallet_id,
                token: token,
            },
        });

    }
}
