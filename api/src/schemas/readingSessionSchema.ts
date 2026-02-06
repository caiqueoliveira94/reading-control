import { z } from "zod";

export const createSessionSchema = z.object({
    body: z.object({
        book_id: z.string(),
        current_page: z.number().optional(),
    }),
});