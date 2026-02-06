import prismaClient from "../../prisma/index";

interface FinishSessionProps {
    id: string;
    user_id: string;
}

class FinishSessionService {
    async execute({ id, user_id }: FinishSessionProps) {
        await prismaClient.readingSession.update({
            where: {
                id,
                user_id
            },
            data: {
                end_time: new Date(),
            }
        });
        return "Session finished successfully";
    }
}

export { FinishSessionService }