import { Response, Request } from "express";
import { AppError } from "../../../errors/app_error";
import { ListCategoryUseCase } from "./list_category_use_case";


export class ListCategoryController {
    async handle(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const { offset, limit } = req.query;
        

        
        const userCase = new ListCategoryUseCase();

        const category = await userCase.execute(userId );

        res.status(201).json({ "response": category });

    }
}