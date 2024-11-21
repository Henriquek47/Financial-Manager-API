import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/app_error";
import { SignUpDTO } from "../dto/sign_up_dto";

export class SignUpUseCase {
    async execute({ name, email, password }: SignUpDTO): Promise<Omit<User, 'password'>> {
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userAlreadyExists) {
            throw new AppError("Usuário já existe", 409);
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                wallet: {
                    create: {
                        value: 0,
                    }
                }
            }
        });

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword ;
    }
}