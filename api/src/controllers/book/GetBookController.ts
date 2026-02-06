import { Request, Response } from "express";
import { GetBookService } from "../../services/book/GetBookService";

class GetBookController {
    async handle(req: Request, res: Response) {
        const { id } = req.query;
        const getBookService = new GetBookService();
        const book = await getBookService.execute({ id: id! as string });
        return res.json(book);
    }
}

export { GetBookController };