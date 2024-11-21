import { prisma } from "../../../prisma/client";

export class GetSpendingUseCase {
    private getPeriodRange(period: "weekly" | "monthly" | "yearly") {
        const now = new Date();
        let startDate: Date;
        let endDate = new Date(now); 

        if (period === "weekly") {
            const firstDayOfWeek = now.getDate() - now.getDay();  
            startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
        } else if (period === "monthly") {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); 
        } else if (period === "yearly") {
            startDate = new Date(now.getFullYear(), 0, 1); 
        } else {
            throw new Error("Invalid period specified");
        }

        return { startDate, endDate };
    }

    async execute(userId: string, period: "weekly" | "monthly" | "yearly" = "weekly") {
        const { startDate, endDate } = this.getPeriodRange(period);

        const transactions = await prisma.transaction.findMany({
            where: {
                user_id: userId,
                AND: [
                    { createdAt: { gte: startDate } },
                    { createdAt: { lte: endDate } },
                ],
            },
        });

        let total = 0;

        const groupedData: { [key: string]: number } = {}; 

        transactions.forEach((transaction) => {
            const value = transaction.value.toNumber();
            const amount = transaction.receiver_id === userId ? value : -value;

            total += amount;

            const dateKey = this.getGroupKey(transaction.createdAt, period);

            if (!groupedData[dateKey]) {
                groupedData[dateKey] = 0;
            }
            groupedData[dateKey] += amount;
        });

        return {
            total,
            breakdown: Object.entries(groupedData).map(([key, value]) => ({
                period: key,
                totalSpent: value,
            })),
        };
    }

    private getGroupKey(date: Date, period: "weekly" | "monthly" | "yearly"): string {
        const parsedDate = new Date(date);
        if (period === "weekly") {
            return parsedDate.toLocaleDateString("pt-BR", { weekday: "long" });
        } else if (period === "monthly") {
            const weekNumber = Math.ceil(parsedDate.getDate() / 7);
            return `Week ${weekNumber}`;
        } else if (period === "yearly") {
            return parsedDate.toLocaleDateString("pt-BR", { month: "long" });
        }
        return "";
    }
}
