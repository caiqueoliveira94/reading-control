import { Request, Response } from "express";
import { CreateSessionService } from "../../services/readingSession/CreateSessionService";

class CreateSessionController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { book_id, start_page } = req.body;
        const createSessionService = new CreateSessionService();
        const session = await createSessionService.execute({
            user_id,
            book_id,
            start_time: new Date(),
            start_page
        });
        return res.json(session);
    }
}

export { CreateSessionController };