import { Request, Response } from "express";
import { GetOverviewStatsService } from "../../services/personalStats/GetOverviewStatsService";

class GetOverviewStatsController {
    async handle(request: Request, response: Response) {
        const user_id = request.user_id;

        const getOverviewStatsService = new GetOverviewStatsService();
        const result = await getOverviewStatsService.execute({ user_id });

        return response.json(result);
    }
}

export { GetOverviewStatsController };
