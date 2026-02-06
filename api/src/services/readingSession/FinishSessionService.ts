import prismaClient from "../../prisma/index";

interface FinishSessionProps {
    id: string;
}

class FinishSessionService {
    async execute({ id }: FinishSessionProps) {
        await prismaClient.readingSession.update({
            where: {
                id,
            },
            data: {
                end_time: new Date(),
            }
        });
        return "Session finished successfully";
    }
}

export { FinishSessionService }