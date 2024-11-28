import { prisma } from "../../../prisma/client";
import { CategoryExpensesDTO } from "../dto/category_expenses_dto";

export class ListExpensesCategoryUseCase {
    async execute(userId: string): Promise<Array<CategoryExpensesDTO>>{
        const topCategories = await prisma.transaction.groupBy({
            by: ['category_id'],
            where: {
                user_id: userId,
                category_id: {
                    not: null,
                },
            },
            _sum: {
                value: true,
            },
            orderBy: {
                _sum: {
                    value: 'desc',
                },
            },
            take: 10,
        });

        const categoryIds = topCategories
            .map((item) => item.category_id)
            .filter((id): id is string => id !== null);

        const categories = await prisma.category.findMany({
            where: {
                id: { in: categoryIds },
            },
        });

        const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));

        const categoriesWithDetails = topCategories.map((item) => {
            const categoryName = item.category_id
                ? categoryMap.get(item.category_id) || 'Categoria desconhecida'
                : 'Categoria desconhecida';


            return new CategoryExpensesDTO(categoryName, item._sum.value?.toNumber() ?? 0);
        });
        return categoriesWithDetails;

    }

}