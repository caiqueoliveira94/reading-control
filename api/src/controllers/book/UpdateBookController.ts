import { Request, Response } from "express";
import { UpdateBookService } from "../../services/book/UpdateBookService";

class UpdateBookController {
    async handle(req: Request, res: Response) {
        const { id } = req.query;
        const { title, author, genre, pages, cover_url } = req.body;
        const user_id = req.user_id;
        const updateBookService = new UpdateBookService();
        const book = await updateBookService.execute({
            id: id! as string,
            title,
            author,
            genre,
            pages,
            cover_url,
            user_id: user_id! as string
        });
        return res.json(book);
    }
}

export { UpdateBookController }
