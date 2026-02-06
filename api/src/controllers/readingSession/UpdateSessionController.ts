import { Request, Response } from "express";
import { UpdateSessionService } from "../../services/readingSession/UpdateSessionService";

class UpdateSessionController {
    async handle(req: Request, res: Response) {
        const { id, current_page } = req.body;
        const user_id = req.user_id;
        const updateSessionService = new UpdateSessionService();
        const session = await updateSessionService.execute({
            id,
            user_id: user_id! as string,
            current_page
        });
        return res.json(session);
    }
}

export { UpdateSessionController };