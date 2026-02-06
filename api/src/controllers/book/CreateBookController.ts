import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/CreateBookService";

class CreateBookController {
    async handle(req: Request, res: Response) {
        const { title, author, genre, pages, cover_url, google_book_id } = req.body;
        const user_id = req.user_id;

        const createBookService = new CreateBookService();
        const book = await createBookService.execute({ user_id, title, author, genre, pages, cover_url, google_book_id });

        return res.json(book);
    }
}

export { CreateBookController };
