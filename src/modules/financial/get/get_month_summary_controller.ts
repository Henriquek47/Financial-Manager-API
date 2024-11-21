import { Response, Request } from "express";
import { GetMonthSummaryUseCase } from "./get_month_summary_use_case";

export class GetMonthSummaryController {
  async handle(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const useCase = new GetMonthSummaryUseCase();
    
    const total = await useCase.execute(userId);

    res.status(200).json({ total });
  }
}
