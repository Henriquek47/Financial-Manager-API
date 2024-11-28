import { Response, Request } from "express";
import { AppError } from "../../../errors/app_error";
import { ListCategoryUseCase } from "./list_category_use_case";
import { ListExpensesCategoryUseCase } from "./list_expenses_categories_use_case";


export class ListExpensesCategoryController {
    async handle(req: Request, res: Response): Promise<void> {
        const userCase = new ListExpensesCategoryUseCase();

        if(!req.user.id){
            throw new AppError("Usuário não encontrado");
        }

        const category = await userCase.execute(req.user.id!);

        res.status(201).json({ "response": category });

    }
}