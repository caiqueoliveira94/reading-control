import { Request, Response } from "express";
import { GetSessionService } from "../../services/readingSession/GetSessionService";

class GetSessionController {
    async handle(req: Request, res: Response) {
        const { id } = req.query;
        const user_id = req.user_id;
        const getSessionService = new GetSessionService();
        const session = await getSessionService.execute({ id: id! as string, user_id: user_id! as string });
        return res.json(session);
    }
}

export { GetSessionController };