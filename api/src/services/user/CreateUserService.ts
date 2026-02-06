import prismaClient from "../../prisma/index";
import bcrypt from "bcryptjs";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: CreateUserProps) {
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    }
}

export { CreateUserService };