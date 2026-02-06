import prismaClient from "../../prisma/index";

class DeleteBookService {
    async execute({ id }: { id: string }) {
        await prismaClient.book.delete({
            where: {
                id,
            },
        });
        return "Book deleted successfully";
    }
}

export { DeleteBookService }
