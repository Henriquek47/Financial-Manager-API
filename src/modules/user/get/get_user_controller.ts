import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/app_error";
import { prisma } from "../../../prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";


export class GetUserController {
    async handle(req: Request, res: Response): Promise<void> {
        const userId = req.user?.id;
        if (!userId) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const userWithDetails = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                wallet: true,
            },
        });

        if (!userWithDetails) {
            throw new AppError("Usuário não encontrado", 404);
        }


        const currentMonthStart = startOfMonth(new Date());
        const currentMonthEnd = endOfMonth(new Date());

        const totalTransactions = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                receiver: null,
                createdAt: {
                    gte: currentMonthStart,
                    lte: currentMonthEnd,
                },
            },
            _sum: {
                value: true,
            },
        });


        const { password: _, ...user } = userWithDetails;
        res.status(200).json({
            "response": {
                id: user.id,
                name: user.name,
                email: user.email,
                wallet: user.wallet,
                expenses: totalTransactions._sum.value || "0",
            },
        });
    }
}
