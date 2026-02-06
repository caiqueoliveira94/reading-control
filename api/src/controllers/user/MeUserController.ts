import { Request, Response } from "express";
import { MeUserService } from "../../services/user/MeUserService";

class MeUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const meUserService = new MeUserService();
        const user = await meUserService.execute(user_id);

        return res.json(user);
    }
}

export { MeUserController };