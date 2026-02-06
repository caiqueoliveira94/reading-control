import { Request, Response } from "express";
import { DeleteBookService } from "../../services/book/DeleteBookService";

class DeleteBookController {
    async handle(req: Request, res: Response) {
        const { id } = req.query;
        const deleteBookService = new DeleteBookService();
        await deleteBookService.execute({ id: id! as string });
        return res.json({ message: "Book deleted successfully" });
    }
}

export { DeleteBookController }