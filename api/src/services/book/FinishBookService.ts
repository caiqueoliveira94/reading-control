import prismaClient from "../../prisma";
import { ReadingStatus } from "../../generated/prisma";

interface FinishBookProps {
    book_id: string;
    status: ReadingStatus;
    user_id: string;
}

class FinishBookService {
    async execute({ book_id, status, user_id }: FinishBookProps) {
        const book = await prismaClient.book.update({
            where: {
                id: book_id,
                user_id
            },
            data: {
                status
            }
        });
        return book;
    }
}

export { FinishBookService };