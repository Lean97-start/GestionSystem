import { createGroupDB, deleteGroupDB, getAllGroupDB, getGroupDB, updateGroupDB, validateGroupUsersExistCreateDB } from "../DB/Query/User/GroupUsers";
import { validateUsersExistCreateDB } from "../DB/Query/User/SearchUser";
import { IGroupUsers } from "../Interface/GroupUsers.interface";
import { IError } from "../Interface/error.Interface";
import { errorGroupUsersClient, errorGroupUsersDB } from "../Util/Response/Group/error";

export const createGroupUsersModel = async (body: any): Promise<IGroupUsers | IError> => {
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

export const updateGroupUsersModel = async (body: any): Promise<IGroupUsers | IError> => {
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

export const getGroupUsersModel = async (_id_group: string): Promise<IGroupUsers | IError> => {
    try {
        const groupUsersFound: any = await getGroupDB(_id_group);
        console.log(groupUsersFound)
        return groupUsersFound;
    } catch (error: any) {
        return error
    }
}

export const getAllGroupUsersModel = async (filterNameGroup?: string | undefined): Promise<IGroupUsers | IError> => {
    try {
        const groupUsersFound: any = await getAllGroupDB(filterNameGroup); 
        return groupUsersFound;
    } catch (error: any) {
        return error
    }
}

export const deleteGroupUsersModel = async (_id_group: string): Promise<IGroupUsers | IError> => {
    try {
        const groupUsersDeleted: any = await deleteGroupDB(_id_group); 
        return groupUsersDeleted;
    } catch (error: any) {
        return error
    }
}

export const assignUserToGroupUserModel = async (body: any): Promise<IGroupUsers> => {
    try {
        if(!body._id_group) throw errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        if(!body.newUsers) throw errorGroupUsersClient.ERROR_NEW_GROUP_USERS_REQUIRED;
        let {_id_group, newUsers} = body;
        const existingGroupUsers: any = await getGroupDB(_id_group);
        let arrayOfexistingUsers = existingGroupUsers.users; //Array para guardar los datos y luego concatenarlos.
        let definitiveArray: Array<string> = [] //Array para los usuarios que no estan repetidos.
        let existingUsers: Array<string> = [] // Array de usuarios ya existentes en el grupo.
        existingGroupUsers.users.forEach((existingUser: any) => {existingUsers.push(existingUser._id.toString())});
        newUsers.map((userID: string) => {
            if(!existingUsers.includes(userID)){
                definitiveArray.push(userID);
            }
        });
        const usersFound = await validateUsersExistCreateDB(definitiveArray); //Busco los datos de los usuarios.
        const arrayConcat: Array<Object> = arrayOfexistingUsers.concat(usersFound);
        const arrayUsersUpdated: any = await updateGroupDB(_id_group, {users: arrayConcat})
        if(!arrayUsersUpdated) throw errorGroupUsersDB.ERROR_UPDATE_GROUP;
        return arrayUsersUpdated;
    } catch (error: any) {
        return error
    }
}

export const deleteUserToGroupUserModel = async (body: any): Promise<IGroupUsers> => {
    try {
        if(!body._id_group) throw errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        if(!body.newUsers) throw errorGroupUsersClient.ERROR_GROUP_USERS_REQUIRED;
        let {_id_group, newUsers} = body;
        const existingGroupUsers: any = await getGroupDB(_id_group);
        let definitiveArray: Array<string> = [] //Array para los usuarios que no estan repetidos.
        existingGroupUsers.users.forEach((existingUser: any) => {
            if(newUsers.includes(existingUser._id.toString())){
                definitiveArray.push(existingUser);
            }
        });
        const arrayUsersUpdated: any = await updateGroupDB(_id_group, {users: definitiveArray})
        if(!arrayUsersUpdated) throw errorGroupUsersDB.ERROR_UPDATE_GROUP;
        return arrayUsersUpdated;
    } catch (error: any) {
        return error
    }
}


