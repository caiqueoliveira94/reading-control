import { ReadingStatus } from "../../generated/prisma";
import prismaClient from "../../prisma/index";

interface CreateSessionProps {
    user_id: string;
    book_id: string;
    start_time: Date;
    status?: ReadingStatus;
    current_page?: number;
}

class CreateSessionService {
    async execute({ user_id, book_id, start_time, status, current_page }: CreateSessionProps) {
        const session = await prismaClient.readingSession.create({
            data: {
                user_id,
                book_id,
                start_time,
                ...(status && { status }),
                ...(current_page && { current_page }),
            },
        });

        return session;
    }
}

export { CreateSessionService };

