import prismaClient from "../../prisma/index";

interface GetBookProps {
    id: string;
}

class GetBookService {
    async execute({ id }: GetBookProps) {
        const book = await prismaClient.book.findFirst({
            where: {
                id,
            },
        });
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }
}

export { GetBookService };