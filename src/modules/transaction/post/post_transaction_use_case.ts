import { Transaction } from "@prisma/client";
import { AppError } from "../../../errors/app_error";
import { prisma } from "../../../prisma/client";
import { TransactionDTO } from "../dto/transaction_dto";
import { Decimal } from "@prisma/client/runtime/library";

export class PostTransactionUseCase {
    async execute({ userId, categoryId, value, receiverId }: TransactionDTO): Promise<Transaction> {

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { wallet: true },
        });

        if (!user || !user.wallet) {
            throw new AppError("Carteira não encontrada para o usuário");
        }



        const transaction = await prisma.transaction.create({
            data: {
                category_id: categoryId,
                receiver_id: receiverId,
                user_id: userId,
                value,
            },
        });

        if (!transaction) {
            throw new AppError("Erro ao fazer transação");
        }

        if (receiverId === userId) {

            const updatedWallet = await prisma.wallet.update({
                data: {
                    value: new Decimal(user.wallet.value).add(value),
                },
                where: { id: user.wallet.id },
            });

        } else {
            const updatedWallet = await prisma.wallet.update({
                data: {
                    value: new Decimal(user.wallet.value).add(-value),
                },
                where: { id: user.wallet.id },
            });

        }

        return transaction;
    }
}
