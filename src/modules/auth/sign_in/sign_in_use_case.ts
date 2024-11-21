import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import bcrypt from 'bcryptjs';
import { AppError } from "../../../errors/app_error";
import { SignInDTO } from "../dto/sign_in_dto";

export class SignInUseCase {
    async execute({ email, password }: SignInDTO): Promise<Omit<User, 'password'>> {
        const userResponse = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!userResponse) {
            throw new AppError("Usuário inexistente", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, userResponse.password);
        if (!isPasswordValid) {
            throw new AppError("Email ou senha incorretos", 400);
        }

        const { password: _, ...userWithoutPassword } = userResponse;

        return userWithoutPassword;
    }
}
