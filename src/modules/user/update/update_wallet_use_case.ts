import { User } from "@prisma/client";
import { AppError } from "../../../errors/app_error";
import { WalletUserDTO } from "../dto/wallet_user_dto";
import { prisma } from "../../../prisma/client";

export class UpdateWalletUseCase {
    async execute({ userId, value }: WalletUserDTO): Promise<Omit<User, 'password'>> {
            const userUpdate = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                wallet: {
                    update: {
                        value: value,
                    }
                }
            }
        })

        if (!userUpdate) {
            throw new AppError("Usuário não encontrado");
        }

        const { password: _, ...userWithoutPassword } = userUpdate;

        return userWithoutPassword;
    }
}