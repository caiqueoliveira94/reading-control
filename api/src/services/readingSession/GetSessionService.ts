import prismaClient from "../../prisma";

interface GetSessionProps {
    id: string;
    user_id: string;
}

class GetSessionService {
    async execute({ id, user_id }: GetSessionProps) {
        const session = await prismaClient.readingSession.findUnique({
            where: {
                id,
                user_id
            },
            include: {
                book: true,
            },
        });
        return session;
    }
}

export { GetSessionService };

