import { Response, Request } from "express";
import { GetSpendingUseCase } from "./get_spending_use_case";
import { AppError } from "../../../errors/app_error";

export class GetSpendingController {
    async handle(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const { period } = req.query;

        const validPeriods = ["weekly", "monthly", "yearly"] as const;
        const isValidPeriod = (value: any): value is typeof validPeriods[number] =>
            validPeriods.includes(value);

        if (!isValidPeriod(period)) {
            throw new AppError("Algo deu errado")
        }

        const useCase = new GetSpendingUseCase();

        const total = await useCase.execute(userId, period);

        res.status(200).json({ total });
    }
}
