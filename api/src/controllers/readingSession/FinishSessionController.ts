import { Request, Response } from "express";
import { FinishSessionService } from "../../services/readingSession/FinishSessionService";

class FinishSessionController {
    async handle(req: Request, res: Response) {
        const { id } = req.query;
        const finishSessionService = new FinishSessionService();
        await finishSessionService.execute({ id: id! as string });
        return res.json({ message: "Session finished successfully" });
    }
}

export { FinishSessionController }
