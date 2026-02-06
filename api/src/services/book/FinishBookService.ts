import prismaClient from "../../prisma";
import { ReadingStatus } from "../../generated/prisma";

interface FinishBookProps {
    book_id: string;
    status: ReadingStatus;
}

class FinishBookService {
    async execute({ book_id, status }: FinishBookProps) {
        const book = await prismaClient.book.update({
            where: {
                id: book_id
            },
            data: {
                status
            }
        });
        return book;
    }
}

export { FinishBookService };