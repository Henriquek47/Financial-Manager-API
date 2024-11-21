import { Transaction, User } from "@prisma/client";
import { AppError } from "../../../errors/app_error";
import { prisma } from "../../../prisma/client";
import { TransactionDTO } from "../dto/transaction_dto";

export class PostTransactionUseCase {
    async execute({ userId, categoryId, value, receiverId }: TransactionDTO): Promise<Transaction> {
            const transaction = await prisma.transaction.create({
                data: {
                    category_id: categoryId,
                    receiver_id: receiverId,
                    user_id: userId,
                    value
                }
            })

        if (!transaction) {
            throw new AppError("Erro ao fazer transação");
        }

        return transaction;
    }
}