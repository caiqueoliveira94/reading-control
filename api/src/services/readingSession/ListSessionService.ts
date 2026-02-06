import prismaClient from "../../prisma";

interface ListSessionProps {
    user_id: string;
}

class ListSessionService {
    async execute({ user_id }: ListSessionProps) {
        const sessions = await prismaClient.readingSession.findMany({
            where: {
                user_id
            },
            include: {
                book: true,
            },
        });
        return sessions;
    }
}

export { ListSessionService };