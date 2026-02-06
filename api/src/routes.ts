import { Router } from "express";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, loginUserSchema } from "./schemas/userSchema";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { MeUserController } from "./controllers/user/MeUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateBookController } from "./controllers/book/CreateBookController";
import { createBookSchema } from "./schemas/bookSchema";
import { createSessionSchema } from "./schemas/readingSessionSchema";
import { CreateSessionController } from "./controllers/readingSession/CreateSessionController";
import { ListBooksController } from "./controllers/book/ListBooksController";
import { GetBookController } from "./controllers/book/GetBookController";

const router = Router();

router.post(
    "/register",
    validateSchema(createUserSchema),
    new CreateUserController().handle
);

router.post(
    "/login",
    validateSchema(loginUserSchema),
    new AuthUserController().handle
);

router.get(
    "/me",
    isAuthenticated,
    new MeUserController().handle
);

router.post(
    "/book",
    isAuthenticated,
    validateSchema(createBookSchema),
    new CreateBookController().handle
);

router.get(
    "/book",
    isAuthenticated,
    new ListBooksController().handle
);

router.get(
    "/book/details",
    isAuthenticated,
    new GetBookController().handle
);


router.post(
    "/reading-session",
    isAuthenticated,
    validateSchema(createSessionSchema),
    new CreateSessionController().handle
);

export { router };
