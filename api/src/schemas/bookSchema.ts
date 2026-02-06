import { z } from "zod";

export const createBookSchema = z.object({
    body: z.object({
        title: z.string().min(3, { message: "Title must be at least 3 characters long" }).max(255, { message: "Title must be at most 255 characters long" }),
        author: z.string().min(3, { message: "Author must be at least 3 characters long" }).max(255, { message: "Author must be at most 255 characters long" }),
        genre: z.string().min(3, { message: "Genre must be at least 3 characters long" }).max(255, { message: "Genre must be at most 255 characters long" }),
        pages: z.number().min(1, { message: "Pages must be at least 1" }).max(10000, { message: "Pages must be at most 10000" }),
        cover_url: z.string().optional(),
    }),
});

