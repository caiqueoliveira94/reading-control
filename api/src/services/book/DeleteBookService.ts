import prismaClient from "../../prisma/index";

interface DeleteBookProps {
    id: string;
    user_id: string;
}

class DeleteBookService {
    async execute({ id, user_id }: DeleteBookProps) {
        await prismaClient.book.delete({
            where: {
                id,
                user_id
            },
        });
        return "Book deleted successfully";
    }
}

export { DeleteBookService }
