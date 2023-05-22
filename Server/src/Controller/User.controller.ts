import { Request, Response } from "express";
import { IUser, RequestModified } from "../Interface/User.interface";
import { getUserModel, getUsersModel, logoutUserModel, signinUserModel, signupUserModel } from "../Model/User.model";
import { validateErrorResponse } from "../Util/validations/errorResponseValidation";
import { success } from "../Util/Response/User/success";


export const signupUserController = async (req: Request, res: Response) => {
    try {
        const userPayload: IUser = req.body;
        const userCreated = await signupUserModel(userPayload);
        validateErrorResponse(userCreated); //Valido si hubo un error en la creación.
        return res
            .status(success.CREATED_USER.statusCode)
            .json({
                message: success.CREATED_USER.message,
                userCreated: userCreated
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const signinUserController = async (req: Request, res: Response) => {
    try {
        const userPayload: IUser = req.body;
        const userCreated = await signinUserModel(userPayload);
        validateErrorResponse(userCreated); //Valido si hubo un error en la creación.
        return res
            .status(success.CREATED_USER.statusCode)
            .json({
                message: success.CREATED_USER.message,
                userCreated: userCreated
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const logoutUserController = async (req: RequestModified, res: Response) => {
    try {
        const _id = req.user.id;
        const logoutSession = await logoutUserModel(_id);
        validateErrorResponse(logoutSession); //Valido si hubo un error en la creación.
        return res
            .status(success.LOGOUT_SUCCESS.statusCode)
            .json(success.LOGOUT_SUCCESS.message);
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const getUserController = async (req: Request, res: Response) => {
    try {
        const userPayload: string = req.body;
        const userFound = await getUserModel(userPayload);
        validateErrorResponse(userFound); //Valido si hubo un error en la creación.
        return res
            .status(success.USER_FOUND.statusCode)
            .json({
                message: success.USER_FOUND.message,
                user: userFound
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const usersFound = await getUsersModel();
        validateErrorResponse(usersFound); //Valido si hubo un error en la creación.
        return res
            .status(success.USERS_FOUND.statusCode)
            .json({
                message: success.USERS_FOUND.message,
                users: usersFound
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}