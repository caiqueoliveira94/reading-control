import { Request, Response } from "express";
import { ListSessionService } from "../../services/readingSession/ListSessionService";

class ListSessionController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const listSessionService = new ListSessionService();
        const sessions = await listSessionService.execute({ user_id: user_id! as string });
        return res.json(sessions);
    }
}

export { ListSessionController };