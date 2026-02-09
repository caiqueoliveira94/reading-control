import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import prismaClient from "../../prisma/index";
import { ReadingStatus } from "../../generated/prisma";

dayjs.extend(utc);
dayjs.extend(timezone);

interface GetPeriodStatsServiceProps {
    user_id: string;
    type: 'week' | 'month' | 'year' | 'all-time';
}
class GetPeriodStatsService {
    async execute({ user_id, type }: GetPeriodStatsServiceProps) {
        const { start_date, end_date } = this.getDateRange(type);

        const pagesStats = await prismaClient.readingSession.aggregate({
            where: {
                user_id,
                start_time: {
                    gte: start_date,
                    lte: end_date
                },
                end_time: { not: null }
            },
            _sum: { pages_read: true },
            _count: { id: true }
        });

        const booksFinished = await prismaClient.book.count({
            where: {
                user_id,
                status: ReadingStatus.COMPLETED,
                finished_at: {
                    gte: start_date,
                    lte: end_date
                }
            }
        });

        const sessions = await prismaClient.readingSession.findMany({
            where: {
                user_id,
                start_time: {
                    gte: start_date,
                    lte: end_date
                },
                end_time: { not: null }
            }
        });

        const totalMinutes = sessions.reduce((acc, session) => {
            if (session.end_time) {
                const diff = session.end_time.getTime() - session.start_time.getTime();
                return acc + Math.floor(diff / 60000);
            }
            return acc;
        }, 0);

        const totalHours = totalMinutes / 60;

        const uniqueDays = new Set(
            sessions.map(
                session => dayjs(session.start_time).tz('America/Sao_Paulo').format('YYYY-MM-DD')
            )
        );

        const daysInPeriod = this.getDaysInPeriod(type);
        const avgPagesPerDay = pagesStats._sum.pages_read
            ? Math.round(pagesStats._sum.pages_read / daysInPeriod)
            : 0;

        return {
            period: {
                type,
                start_date: dayjs(start_date).tz('America/Sao_Paulo').format('YYYY-MM-DD'),
                end_date: dayjs(end_date).tz('America/Sao_Paulo').format('YYYY-MM-DD')
            },
            pages_read: pagesStats._sum.pages_read,
            reading_sessions: pagesStats._count.id,
            books_finished: booksFinished,
            total_minutes: totalMinutes,
            total_hours: totalHours,
            days_read: uniqueDays.size,
            avg_pages_per_day: avgPagesPerDay,

        };
    }

    private getDaysInPeriod(type: 'week' | 'month' | 'year' | 'all-time') {
        const now = dayjs().tz('America/Sao_Paulo');

        switch (type) {
            case 'week':
                return 7;
            case 'month':
                return now.daysInMonth();
            case 'year':
                return 365;
            case 'all-time':
            default:
                return now.diff(dayjs(0), 'day') || 1;
        }
    }

    private getDateRange(type: 'week' | 'month' | 'year' | 'all-time') {
        const now = dayjs().tz('America/Sao_Paulo');
        let startDate: Date;
        let endDate: Date = now.endOf('day').toDate();

        switch (type) {
            case 'week':
                startDate = now.startOf('week').toDate(); // Domingo
                break;
            case 'month':
                startDate = now.startOf('month').toDate();
                break;
            case 'year':
                startDate = now.startOf('year').toDate();
                break;
            case 'all-time':
            default:
                startDate = dayjs(0).toDate();
                break;
        }

        return { start_date: startDate, end_date: endDate };
    }
}

export { GetPeriodStatsService };