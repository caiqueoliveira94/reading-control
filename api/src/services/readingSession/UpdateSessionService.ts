import prismaClient from "../../prisma";

interface UpdateSessionProps {
    id: string;
    user_id: string;
    end_page: number;
}

class UpdateSessionService {
    async execute({ id, user_id, end_page }: UpdateSessionProps) {
        const session = await prismaClient.readingSession.update({
            where: {
                id,
                user_id
            },
            data: {
                end_page
            }
        });
        return session;
    }
}

export { UpdateSessionService };
