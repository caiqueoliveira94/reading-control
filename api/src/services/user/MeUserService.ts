import prismaClient from "../../prisma";

class MeUserService {
    async execute(user_id: string) {
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id: user_id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user;
        } catch (error) {
            throw new Error("Error getting user");
        }
    }
}

export { MeUserService };