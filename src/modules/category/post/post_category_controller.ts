import { Category } from "@prisma/client";
import { Response, Request } from "express";
import { PostCategoryUseCase } from "./post_category_use_case";
import { AppError } from "../../../errors/app_error";


export class PostCategoryController {
    async handle(req: Request, res: Response): Promise<void> {
        const { userId, name, image, cor } = req.body;

        const userCase = new PostCategoryUseCase();

        const category = await userCase.execute({userId, name, image, cor});

        if(!category){
            throw new AppError("Erro ao criar category");
        }

        res.status(201).json({"response": category});

    }
}