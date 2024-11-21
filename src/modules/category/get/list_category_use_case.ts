import { Category } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class ListCategoryUseCase {
    async execute(userId: string,): Promise<Array<Category>> {
        const categories = await prisma.category.findMany({
            where: {
                is_public: true

            },

        });

        return categories;

    }
}