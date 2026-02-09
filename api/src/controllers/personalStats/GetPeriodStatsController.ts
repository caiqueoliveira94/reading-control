import { Request, Response } from "express";
import { GetPeriodStatsService } from "../../services/personalStats/GetPeriodStatsService";

class GetPeriodStatsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { type } = req.query;

        if (!type || !['week', 'month', 'year', 'all-time'].includes(type as string)) {
            return res.status(400).json({ error: 'Invalid period type. Use week, month, year or all-time' });
        }

        const service = new GetPeriodStatsService();

        const result = await service.execute({
            user_id,
            type: type as 'week' | 'month' | 'year' | 'all-time'
        });

        return res.json(result);
    }
}

export { GetPeriodStatsController };