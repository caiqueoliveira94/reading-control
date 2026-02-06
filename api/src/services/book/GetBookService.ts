import prismaClient from "../../prisma/index";

interface GetBookProps {
    id: string;
    user_id: string;
}

class GetBookService {
    async execute({ id, user_id }: GetBookProps) {
        const book = await prismaClient.book.findFirst({
            where: {
                id,
                user_id,
            },
        });
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }
}

export { GetBookService };