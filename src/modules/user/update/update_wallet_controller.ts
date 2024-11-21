import { NextFunction, Response, Request } from "express";
import { UpdateWalletUseCase } from "./update_wallet_use_case";
import { AppError } from "../../../errors/app_error";

export class UpdateWalletController {
    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {  userId, value } = req.body;

        if(value < 0){
            throw new AppError("Erro na transação, tente mais tarde")
        }
 
            const createUserUseCase = new UpdateWalletUseCase();
            const result = await createUserUseCase.execute({ userId, value });

            res.status(201).json({"response": {
                "body": result,
            }});
      
    }
}
