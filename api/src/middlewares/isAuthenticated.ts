import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const { sub } = verify(token!, process.env.JWT_SECRET as string) as Payload;
        req.user_id = sub;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

};