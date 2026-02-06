import prismaClient from "../../prisma/index";
import { ReadingStatus } from "../../generated/prisma";

interface CreateBookProps {
    user_id: string;
    title: string;
    author: string;
    genre: string;
    pages: number;
    cover_url: string;
    google_book_id: string;
    status: ReadingStatus;
}

class CreateBookService {
    async execute({ user_id, title, author, genre, pages, cover_url, google_book_id, status }: CreateBookProps) {
        const book = await prismaClient.book.create({
            data: {
                title,
                author,
                genre,
                pages,
                cover_url,
                google_book_id,
                status,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            },
        });

        return book;
    }
}

export { CreateBookService };