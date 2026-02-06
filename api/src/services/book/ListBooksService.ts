import prismaClient from "../../prisma/index";

interface ListBooksProps {
    user_id: string;
}

class ListBooksService {
    async execute({ user_id }: ListBooksProps) {
        const books = await prismaClient.book.findMany({
            where: {
                user_id,
            },
        });
        return books;
    }
}

export { ListBooksService };