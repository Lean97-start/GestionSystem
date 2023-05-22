import { Request, Response } from "express";
import { assignUserToGroupUserModel, createGroupUsersModel, deleteGroupUsersModel, deleteUserToGroupUserModel, getAllGroupUsersModel, getGroupUsersModel, updateGroupUsersModel } from "../Model/GroupUsers.model";
import { validateErrorResponse } from "../Util/validations/errorResponseValidation";
import { success } from "../Util/Response/User/success";

export const createGroupUsersController = async (req: Request, res: Response) => {
    try {   
        const groupCreated = await createGroupUsersModel(req.body);
        validateErrorResponse(groupCreated);
        return res
            .status(success.GROUP_CREATED.statusCode)
            .json({
                message: success.GROUP_CREATED.message,
                group: groupCreated
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const updateGroupUsersController = async (req: Request, res: Response) => {
    try {     
        const groupUpdated = await updateGroupUsersModel(req.body);
        validateErrorResponse(groupUpdated);
        return res
            .status(success.GROUP_UPDATED.statusCode)
            .json({
                message: success.GROUP_UPDATED.message,
                group: groupUpdated
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const getGroupUsersController = async (req: Request, res: Response) => {
    try {
        const _id_group = req.params.id;  
        const groupFound = await getGroupUsersModel( _id_group);
        validateErrorResponse(groupFound);
        return res
            .status(success.GROUP_USERS_FOUND.statusCode)
            .json({
                message: success.GROUP_USERS_FOUND.message,
                group: groupFound
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const getAllGroupUsersController = async (req: Request, res: Response) => {
    try {    
        const {filterNameGroup} = req.body;
        const groupsFound = await getAllGroupUsersModel( filterNameGroup );
        validateErrorResponse(groupsFound);
        return res
            .status(success.GROUPS_USERS_FOUND.statusCode)
            .json({
                message: success.GROUPS_USERS_FOUND.message,
                group: groupsFound
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const deleteGroupUsersController = async (req: Request, res: Response) => {
    try {
        const {_id_group} = req.body;       
        const groupDeleted = await deleteGroupUsersModel(_id_group);
        validateErrorResponse(groupDeleted);
        return res
            .status(success.GROUP_USERS_DELETED.statusCode)
            .json({
                message: success.GROUP_USERS_DELETED.message,
                group: groupDeleted
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const assignUserToGroupUserController = async (req: Request, res: Response) => {
    try {      
        const groupDeleted = await assignUserToGroupUserModel(req.body);
        validateErrorResponse(groupDeleted);
        return res
            .status(success.GROUP_USERS_DELETED.statusCode)
            .json({
                message: success.GROUP_USERS_DELETED.message,
                group: groupDeleted
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const deleteUserFromGroupUserController = async (req: Request, res: Response) => {
    try {      
        const groupDeleted = await deleteUserToGroupUserModel(req.body);
        validateErrorResponse(groupDeleted);
        return res
            .status(success.GROUP_USERS_DELETED.statusCode)
            .json({
                message: success.GROUP_USERS_DELETED.message,
                group: groupDeleted
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}