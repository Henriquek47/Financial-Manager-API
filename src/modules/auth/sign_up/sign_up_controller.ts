import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import { SignUpUseCase } from "./sign_up_use_case";
import { JWT_SECRET } from "../../..";
import jwt from "jsonwebtoken";

export class SignUpController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, email, password } = req.body;
            console.log("dsdsadsadsadsadsadsadsa");
            const hashedPassword = await bcrypt.hash(password, 10);

            const createUserUseCase = new SignUpUseCase();
            const result = await createUserUseCase.execute({ name, email, password: hashedPassword });
            const token = jwt.sign({ userId: result.id }, JWT_SECRET, { expiresIn: '30d' });

            res.status(201).json({"response": {
                id: result.id,
                name: result.name,
                email: result.email,
                wallet_id: result.wallet_id,
                token: token,
            },
           
        });
      
    }
}
