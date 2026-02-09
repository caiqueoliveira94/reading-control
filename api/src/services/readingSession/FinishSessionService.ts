import prismaClient from "../../prisma/index";

interface FinishSessionProps {
    id: string;
    user_id: string;
    end_page: number;
}

class FinishSessionService {
    async execute({ id, user_id, end_page }: FinishSessionProps) {
        const session = await prismaClient.readingSession.findFirst({
            where: {
                id,
                user_id
            }
        });

        if (!session) {
            throw new Error("Session not found");
        }

        await prismaClient.readingSession.update({
            where: {
                id,
                user_id
            },
            data: {
                end_time: new Date(),
                end_page,
                pages_read: end_page - session.start_page
            }
        });
        return "Session finished successfully";
    }
}

export { FinishSessionService }