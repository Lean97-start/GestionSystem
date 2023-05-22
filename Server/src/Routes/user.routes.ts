import { Router } from "express";
import {
    getAllUsersController,
    getUserController,
    logoutUserController,
    signinUserController,
    signupUserController,
} from "../Controller/User.controller";
import { validateToken } from "../Middleware/user.validation";

const userRouter = Router();

userRouter.post("/V1/user/createUser", signupUserController);
userRouter.post("/V1/user/signinUser", signinUserController);
userRouter.post("/V1/user/closeSession", validateToken, logoutUserController);
userRouter.post("/V1/user/getUser", validateToken, getUserController);
userRouter.post("/V1/user/getAllUser", validateToken, getAllUsersController);

export default userRouter;
