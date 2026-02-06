import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(255, { message: "Name must be at most 255 characters long" }),
        email: z.email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(255, { message: "Password must be at most 255 characters long" }),
    }),
});

export const loginUserSchema = z.object({
    body: z.object({
        email: z.email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(255, { message: "Password must be at most 255 characters long" }),
    }),
});