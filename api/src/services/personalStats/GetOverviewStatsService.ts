import { ReadingStatus } from "../../generated/prisma";
import prismaClient from "../../prisma/index";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface GetOverviewStatsProps {
    user_id: string;
}

class GetOverviewStatsService {
    async execute({ user_id }: GetOverviewStatsProps) {

        const totalBooks = await prismaClient.book.count({
            where: {
                user_id: user_id,
            },
        });

        const totalBooksRead = await prismaClient.book.count({
            where: {
                user_id: user_id,
                status: ReadingStatus.COMPLETED,
            },
        });

        const totalBooksReading = await prismaClient.book.count({
            where: {
                user_id: user_id,
                status: ReadingStatus.READING,
            },
        });

        const totalPagesRead = await prismaClient.readingSession.aggregate({
            where: {
                user_id: user_id,
            },
            _sum: {
                pages_read: true,
            },
        });

        const sessions = await prismaClient.readingSession.findMany({
            where: {
                user_id: user_id,
            },
            select: {
                start_time: true,
                end_time: true,
            }
        });

        const totalMinutesRead = sessions.reduce((acc, session) => {
            if (session.end_time) {
                const diff = session.end_time.getTime() - session.start_time.getTime();
                return acc + Math.floor(diff / 60000);
            }
            return acc;
        }, 0);

        const totalHoursRead = totalMinutesRead / 60;

        return {
            totalBooks,
            totalBooksRead,
            totalBooksReading,
            totalPagesRead: totalPagesRead._sum.pages_read || 0,
            totalMinutesRead,
            totalHoursRead
        };
    }
}

export { GetOverviewStatsService };

