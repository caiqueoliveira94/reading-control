import { Request, Response } from "express";
import { GetBookService } from "../../services/book/GetBookService";

class GetBookController {
    async handle(req: Request, res: Response) {
        const { id } = req.query;
        const user_id = req.user_id;
        const getBookService = new GetBookService();
        const book = await getBookService.execute({ id: id! as string, user_id });
        return res.json(book);
    }
}

export { GetBookController };