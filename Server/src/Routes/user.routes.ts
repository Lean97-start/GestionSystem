import { Router } from "express";
import {
    getAllUsersController,
    getUserController,
    logoutUserController,
    signinUserController,
    signupUserController,
} from "../Controller/User.controller";

const userRouter = Router();

userRouter.post("/V1/user/createUser", signupUserController);
userRouter.post("/V1/user/signinUser", signinUserController);
userRouter.post("/V1/user/closeSession", logoutUserController);
userRouter.post("/V1/user/getUser", getUserController);
userRouter.post("/V1/user/getAllUser", getAllUsersController);

export default userRouter;
