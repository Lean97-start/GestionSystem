import { IGroupUsers } from "../../../Interface/GroupUsers.interface";
import { errorGroupUsersClient, errorGroupUsersDB } from "../../../Util/Response/Group/error";
import { errorClient } from "../../../Util/Response/User/error";
import groupUsersInstanceDB from "../../Schema/GroupUserSchema";

export const createGroupDB = async (nameGroup: string, users: Array<Object>) => {
    try {
        const group = {nameGroupUsers: nameGroup, users}
        const groupCreated = await groupUsersInstanceDB.create(group);
        return groupCreated;
    } catch (error: any) {
        return errorGroupUsersDB.ERROR_CREATE_GROUP;
    }
}

export const updateGroupDB = async (_id_group: string, dataUpdate: Object) => {
    try {       
        const groupCreated = await groupUsersInstanceDB.findOneAndUpdate({_id: {$eq: _id_group}}, dataUpdate, {new: true});
        return groupCreated;
    } catch (error: any) {
        return errorGroupUsersDB.ERROR_UPDATE_GROUP;
    }
}

export const getGroupDB = async (_id_group: string | null, nameGroupUsers?: string) => {
    try {       
        const groupFound = await groupUsersInstanceDB.findOne({
            $or: [
                {nameGroupUsers: {$eq: nameGroupUsers}},
                {_id: {$eq: _id_group}}
            ]});
        if(!groupFound) throw errorGroupUsersClient.ERROR_GROUP_USERS
        return groupFound;
    } catch (error: any) {
        
        if(error.statusCode.toString().startsWith('4')) throw error;
        return errorGroupUsersDB.ERROR_GET_GROUP;
    }
}

export async function validateGroupUsersExistCreateDB(nameGroupUsers: string): Promise<IGroupUsers> {
    try {
        const groupUsersFound: any = await groupUsersInstanceDB.find({ nameGroupUsers: { $eq: nameGroupUsers }});
        if(groupUsersFound.length > 0) throw errorGroupUsersClient.ERROR_GROUP_USERS_REGISTED
        return groupUsersFound;
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error;
        throw errorGroupUsersDB.ERROR_VALIDATE_GROUP;
    }
}

export const getAllGroupDB = async (filterName?: string) => {
    try {   
        let filters = {};
        if(filterName?.length){
            const regexString = new RegExp(filterName,"i")
            filters = {nameGroupUsers: regexString}
        }
        const groupFound = await groupUsersInstanceDB.find(filters);
        if(groupFound.length === 0) throw errorGroupUsersClient.ERROR_GROUP_USERS
        return groupFound;
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error;
        return errorGroupUsersDB.ERROR_GET_GROUP;
    }
}

export const deleteGroupDB = async (_id_group: string) => {
    try {       
        const groupDeleted = await groupUsersInstanceDB.findOneAndDelete({_id: {$eq: _id_group}});
        if(!groupDeleted) throw errorGroupUsersClient.ERROR_GROUP_USERS
        return groupDeleted;
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error;
        return errorGroupUsersDB.ERROR_DELETE_GROUP;
    }
}



