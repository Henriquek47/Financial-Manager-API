import { Response, Request } from "express";
import { AppError } from "../../../errors/app_error";
import { PostTransactionUseCase } from "./post_transaction_use_case";


export class PostTransactionController {
    async handle(req: Request, res: Response): Promise<void> {
        const { userId, categoryId, value, receiverId } = req.body;

        if(value <= 0){
            throw new AppError("Valor da transação invalido");
        }

        const userCase = new PostTransactionUseCase();

        const transaction = await userCase.execute({userId, categoryId, value, receiverId});

        if(!transaction){
            throw new AppError("Erro ao concluir a transação");
        }

        res.status(201).json({"response": transaction});

    }
}