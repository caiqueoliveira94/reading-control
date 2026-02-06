import { Request, Response } from "express";
import { CreateSessionService } from "../../services/readingSession/CreateSessionService";

class CreateSessionController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { book_id, current_page } = req.body;
        const createSessionService = new CreateSessionService();
        const session = await createSessionService.execute({
            user_id,
            book_id,
            start_time: new Date(),
            current_page
        });
        return res.json(session);
    }
}

export { CreateSessionController };