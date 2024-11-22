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

    private generatePeriods(period: "weekly" | "monthly" | "yearly", startDate: Date): string[] {
        const periods: string[] = [];
        const now = new Date();

        if (period === "weekly") {
            for (let i = 0; i < 7; i++) {
                const day = new Date(startDate);
                day.setDate(startDate.getDate() + i);
                periods.push(day.toLocaleDateString("pt-BR", { weekday: "long" }));
            }
        } else if (period === "monthly") {
            const weeksInMonth = Math.ceil((now.getDate() + new Date(now.getFullYear(), now.getMonth(), 0).getDate()) / 7);
            for (let i = 1; i <= weeksInMonth; i++) {
                periods.push(`${i}`);
            }
        } else if (period === "yearly") {
            for (let i = 0; i < 12; i++) {
                const month = new Date(startDate);
                month.setMonth(i);
                periods.push(month.toLocaleDateString("pt-BR", { month: "long" }));
            }
        }

        return periods;
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
            if (transaction.receiver_id !== userId) {

                total += value;

                const dateKey = this.getGroupKey(transaction.createdAt, period);

                if (!groupedData[dateKey]) {
                    groupedData[dateKey] = 0;
                }
                groupedData[dateKey] += value;
            }
        });

        const periods = this.generatePeriods(period, startDate);

        const breakdown = periods.map((periodKey) => ({
            period: periodKey,
            totalSpent: groupedData[periodKey] || 0,
        }));

        return {
            total,
            breakdown,
        };
    }

    private getGroupKey(date: Date, period: "weekly" | "monthly" | "yearly"): string {
        const parsedDate = new Date(date);
        if (period === "weekly") {
            return parsedDate.toLocaleDateString("pt-BR", { weekday: "long" });
        } else if (period === "monthly") {
            const weekNumber = Math.ceil(parsedDate.getDate() / 7);
            return `${weekNumber}`;
        } else if (period === "yearly") {
            return parsedDate.toLocaleDateString("pt-BR", { month: "long" });
        }
        return "";
    }
}
