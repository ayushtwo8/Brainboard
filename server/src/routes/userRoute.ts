import { Router } from "express";

import { signup, login, getProfile } from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/profile',authenticate ,getProfile)

export default userRouter;