import { Router } from "express";
import { 
    assignUserToGroupUserController,
    createGroupUsersController,
    deleteGroupUsersController,
    getAllGroupUsersController,
    getGroupUsersController,
    updateGroupUsersController 
} from "../Controller/GroupUsers.controller";
import { validateToken } from "../Middleware/user.validation";

const groupUsersRouter = Router();

groupUsersRouter.post("/V1/group/createGroupUsers", validateToken, createGroupUsersController);
groupUsersRouter.put("/V1/group/updateGroupUsers", validateToken, updateGroupUsersController);
groupUsersRouter.get("/V1/group/getGroupUsers/:id", validateToken, getGroupUsersController);
groupUsersRouter.post("/V1/group/getAllGroupUsers", validateToken, getAllGroupUsersController);
groupUsersRouter.delete("/V1/group/deleteGroupUsers", validateToken, deleteGroupUsersController);
groupUsersRouter.post("/V1/group/assignUserToGroupUser", validateToken, assignUserToGroupUserController);

export default groupUsersRouter;
