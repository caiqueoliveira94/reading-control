import prismaClient from "../../prisma";

interface UpdateSessionProps {
    id: string;
    user_id: string;
    current_page: number;
}

class UpdateSessionService {
    async execute({ id, user_id, current_page }: UpdateSessionProps) {
        const session = await prismaClient.readingSession.update({
            where: {
                id,
                user_id
            },
            data: {
                current_page
            }
        });
        return session;
    }
}

export { UpdateSessionService };
