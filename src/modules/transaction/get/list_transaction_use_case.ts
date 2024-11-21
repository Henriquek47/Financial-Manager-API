import { Transaction } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class ListTransactionUseCase {
    async execute(userId: string, offset: number, limit: number, startDate?: Date, endDate?: Date, categoryId?: string, sortByValue: "asc" | "desc" | undefined = undefined, sortByDate: "asc" | "desc" | undefined = undefined): Promise<Array<Transaction>> {
        
        const orderBy = [];

        if (sortByValue) {
            orderBy.push({ value: sortByValue });
        }
        
        if (sortByDate) {
            orderBy.push({ createdAt: sortByDate });
        }

        const whereConditions: any = {
            user_id: userId,
            AND: [
                startDate ? { createdAt: { gte: startDate } } : {},
                endDate ? { createdAt: { lte: endDate } } : {},
            ],
        };

        if (categoryId) {
            whereConditions.category_id = categoryId;
        }
        const transactions = await prisma.transaction.findMany({
            where: whereConditions,
            include: {
                category: true,
            },
            orderBy: orderBy.length > 0 ? orderBy : undefined,
            skip: offset,
            take: limit,
        });

        return transactions;
    }
}
