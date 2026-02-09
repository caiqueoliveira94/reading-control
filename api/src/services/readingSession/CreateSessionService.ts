import { ReadingStatus } from "../../generated/prisma";
import prismaClient from "../../prisma/index";

interface CreateSessionProps {
    user_id: string;
    book_id: string;
    start_time: Date;
    status?: ReadingStatus;
    start_page?: number;
}

class CreateSessionService {
    async execute({ user_id, book_id, start_time, status, start_page }: CreateSessionProps) {
        const session = await prismaClient.readingSession.create({
            data: {
                user_id,
                book_id,
                start_time,
                start_page: start_page || 0,
                ...(status && { status }),
            },
        });

        return session;
    }
}

export { CreateSessionService };

