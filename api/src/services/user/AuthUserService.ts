import "dotenv/config";
import bcrypt from "bcryptjs";
import prismaClient from "../../prisma/index";
import { sign } from "jsonwebtoken";

interface AuthUserProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthUserProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error("Invalid credentials");
        }

        const token = sign({
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET as string, {
            subject: user.id,
            expiresIn: "30d",
        });

        return { id: user.id, name: user.name, email: user.email, token };
    }
}

export { AuthUserService };