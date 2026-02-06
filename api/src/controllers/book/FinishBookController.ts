import { Request, Response } from "express";
import { FinishBookService } from "../../services/book/FinishBookService";
import { ReadingStatus } from "../../generated/prisma";

class FinishBookController {
    async handle(req: Request, res: Response) {
        const { book_id } = req.query;
        const user_id = req.user_id;

        const finishBookService = new FinishBookService();
        const book = await finishBookService.execute({
            book_id: book_id as string,
            status: ReadingStatus.COMPLETED, 
            user_id: user_id! as string 
        });
        return res.json(book);
    }
}

export { FinishBookController };