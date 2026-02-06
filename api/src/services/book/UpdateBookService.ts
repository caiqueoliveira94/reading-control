import prismaClient from "../../prisma/index";

interface UpdateBookProps {
    id: string;
    title: string;
    author: string;
    genre: string;
    pages: number;
    cover_url: string;
}

class UpdateBookService {
    async execute({ id, title, author, genre, pages, cover_url }: UpdateBookProps) {
        const book = await prismaClient.book.update({
            where: {
                id,
            },
            data: {
                title,
                author,
                genre,
                pages,
                cover_url,
            }
        })

        return book;
    }
}

export { UpdateBookService }
