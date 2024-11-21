import { Response, Request } from "express";
import { AppError } from "../../../errors/app_error";
import { ListTransactionUseCase } from "./list_transaction_use_case";


export class ListTransactionController {
    async handle(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const { offset, limit } = req.query;
        const { startDate, endDate, categoryId, sortByValue, sortByDate } = req.body;

        const offsetNumber = parseInt(offset as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        if (isNaN(offsetNumber) || isNaN(limitNumber)) {
            throw new AppError("Erro na listagem");
        }

        const startDateParsed = startDate ? new Date(startDate as string) : undefined;
        const endDateParsed = endDate ? new Date(endDate as string) : undefined;

        if (endDateParsed != null) {
            endDateParsed!.setDate(endDateParsed.getDate() + 1);
        }


        const userCase = new ListTransactionUseCase();

        const transactions = await userCase.execute(userId, offsetNumber, limitNumber, startDateParsed, endDateParsed, categoryId, sortByValue, sortByDate);

        res.status(201).json({ "response": transactions });

    }
}