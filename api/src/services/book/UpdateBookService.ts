import prismaClient from "../../prisma/index";

interface UpdateBookProps {
    id: string;
    title: string;
    author: string;
    genre: string;
    pages: number;
    cover_url: string;
    user_id: string;
}

class UpdateBookService {
    async execute({ id, title, author, genre, pages, cover_url, user_id }: UpdateBookProps) {
        const book = await prismaClient.book.update({
            where: {
                id,
                user_id
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
