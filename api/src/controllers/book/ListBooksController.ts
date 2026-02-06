import { Request, Response } from "express";
import { ListBooksService } from "../../services/book/ListBooksService";

class ListBooksController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const listBooksService = new ListBooksService();
        const books = await listBooksService.execute({ user_id: user_id! });
        return res.json(books);
    }
}

export { ListBooksController };
