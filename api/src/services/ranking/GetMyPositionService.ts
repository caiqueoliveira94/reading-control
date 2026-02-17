import prismaClient from "../../prisma/index";

class GetMyPositionService {
    async execute(user_id: string) {
        const ranking = await prismaClient.readingSession.groupBy({
            by: ["user_id"],
            where: {
                user_id: user_id,
            },
            _sum: {
                pages_read: true,
            },
        });

        return ranking;
    }
}

export { GetMyPositionService };
