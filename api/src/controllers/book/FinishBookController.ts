import { Request, Response } from "express";
import { FinishBookService } from "../../services/book/FinishBookService";
import { ReadingStatus } from "../../generated/prisma";

class FinishBookController {
    async handle(req: Request, res: Response) {
        const { book_id } = req.query;

        const finishBookService = new FinishBookService();
        const book = await finishBookService.execute({ book_id: book_id as string, status: ReadingStatus.COMPLETED });
        return res.json(book);
    }
}

export { FinishBookController };