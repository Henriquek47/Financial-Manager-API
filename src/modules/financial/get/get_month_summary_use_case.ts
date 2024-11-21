import { prisma } from "../../../prisma/client";

export class GetMonthSummaryUseCase {
    async execute(userId: string): Promise<Object> {
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const transactions = await prisma.transaction.findMany({
            where: {
                user_id: userId,
                AND: [
                    { createdAt: { gte: startDate } },
                    { createdAt: { lte: endDate } },
                ],
            },
            include: {
                category: true,
            }
        });

        let total = 0;
        const categoryExpenses: { [key: string]: number } = {};

        transactions.forEach((transaction) => {
            const value = transaction.value.toNumber();

            const amount =
                transaction.receiver_id === userId ? value : -value;

            total += amount;
            if(transaction.category != null){
            const categoryId = transaction.category.id;
            if (!categoryExpenses[categoryId]) {
                categoryExpenses[categoryId] = 0;
            }
            categoryExpenses[categoryId] += amount;
        }

        });

        const categoryResults = await prisma.category.findMany({
            where: {
                id: { in: Object.keys(categoryExpenses) },
            },
        });


        const result = categoryResults.map((category) => ({
            category: {
                ...category,
                totalSpent: categoryExpenses[category.id] || 0, 
            },
        }));

        return { total, result };
    }
}