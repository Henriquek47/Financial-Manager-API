import { Category } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { CategoryDTO } from "../dto/category_dto";
import { AppError } from "../../../errors/app_error";

export class PostCategoryUseCase {
    async execute({ userId, name, image, cor }: CategoryDTO): Promise<Category> {
        const userCategory = await prisma.userCategory.findMany({
            where: {
                category: { name },
                user_id: userId,
            },
            include: {
                category: true,
            },
        });

        console.log(userCategory);

        if(userCategory.length > 0){
            throw new AppError("Categoria já criada");
        }

        const newCategory = await prisma.category.create({
            data: { name, image, is_public: true, cor: cor },
        });

        if(!newCategory){
            throw new AppError("Erro ao criar categoria");
        }


        await prisma.userCategory.create({
            data: {
                user_id: userId,
                category_id: newCategory.id,
            },
        });


        return newCategory;
    }
}