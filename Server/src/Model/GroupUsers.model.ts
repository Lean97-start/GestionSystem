import { createGroupDB, deleteGroupDB, getAllGroupDB, getGroupDB, updateGroupDB, validateGroupUsersExistCreateDB } from "../DB/Query/User/GroupUsers";
import { validateUsersExistCreateDB } from "../DB/Query/User/SearchUser";
import { IGroupUsers } from "../Interface/GroupUsers.interface";
import { IUser } from "../Interface/User.interface";
import { IError } from "../Interface/error.Interface";
import { errorGroupUsersClient } from "../Util/Response/Group/error";

export const createGroupUsersModel = async (body: any): Promise<Array<IGroupUsers> | IError> => {
    try {  
        if(!body.nameGroupUsers || body.nameGroupUsers.length === 0){ throw errorGroupUsersClient.ERROR_GROUP_USERS_NAME_REQUIRED }
        if(!body.users || body.users.length === 0){ throw errorGroupUsersClient.ERROR_GROUP_USERS_REQUIRED }
        const {nameGroupUsers, users} = body;
        await validateGroupUsersExistCreateDB(nameGroupUsers);
        const usersFound = await validateUsersExistCreateDB(users);
        const groupUsersFound: any = await createGroupDB(nameGroupUsers, usersFound); 
        return groupUsersFound;
    } catch (error: any) {
        return error
    }
}

export const updateGroupUsersModel = async (body: any): Promise<Array<IGroupUsers> | IError> => {
    try {
        let updateData = {};
        let users: Array<IGroupUsers>;
        if(!body._id_group) throw errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        if(body.nameGroupUsers) {
            await validateGroupUsersExistCreateDB(body.nameGroupUsers);
            Object.defineProperty(updateData, 'nameGroupUsers', { 
                value: body.nameGroupUsers,
                writable: true,
                enumerable: true,
                configurable: true
            })
        }
        if(body.users.length > 0){
            users = await validateUsersExistCreateDB(body.users);
            Object.defineProperty(updateData, 'users', {
                value: users,
                writable: true,
                enumerable: true,
                configurable: true
            })
        }     
        const groupUsersUpdated: any = await updateGroupDB(body._id_group, updateData); 
        return groupUsersUpdated;
    } catch (error: any) {
        return error
    }
}

export const getGroupUsersModel = async (_id_group: string): Promise<Array<IGroupUsers> | IError> => {
    try {
        const groupUsersFound: any = await getGroupDB(_id_group); 
        return groupUsersFound;
    } catch (error: any) {
        return error
    }
}

export const getAllGroupUsersModel = async (filterNameGroup?: string | undefined): Promise<Array<IGroupUsers> | IError> => {
    try {
        const groupUsersFound: any = await getAllGroupDB(filterNameGroup); 
        return groupUsersFound;
    } catch (error: any) {
        return error
    }
}

export const deleteGroupUsersModel = async (_id_group: string): Promise<Array<IGroupUsers> | IError> => {
    try {
        const groupUsersDeleted: any = await deleteGroupDB(_id_group); 
        return groupUsersDeleted;
    } catch (error: any) {
        return error
    }
}