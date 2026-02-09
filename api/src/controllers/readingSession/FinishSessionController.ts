import { Request, Response } from "express";
import { FinishSessionService } from "../../services/readingSession/FinishSessionService";

class FinishSessionController {
    async handle(req: Request, res: Response) {
        const { id, end_page } = req.body;
        const user_id = req.user_id;
        const finishSessionService = new FinishSessionService();
        await finishSessionService.execute({
            id: id! as string,
            user_id: user_id! as string,
            end_page: end_page! as number,
        });
        return res.json({ message: "Session finished successfully" });
    }
}

export { FinishSessionController }
