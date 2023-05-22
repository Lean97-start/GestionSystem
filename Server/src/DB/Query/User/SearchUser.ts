import { IUser } from "../../../Interface/User.interface"
import { errorClient, errorDB } from "../../../Util/Response/User/error"
import userInstanceDB from "../../Schema/UserSchema"


export const searchUserDB = async (_id_user: string | null, userName?: string): Promise<IUser> => {
    try {
        const userFound = await userInstanceDB.findOne({
            $or: [
                {username: {$eq: userName}},
                {_id: {$eq: _id_user}}
            ]})
            .then((user) => {return user})
            .catch(() => {throw errorDB.ERROR_USER_NOT_FOUND})
        if(!userFound) throw errorDB.ERROR_USER_NOT_FOUND
        return userFound
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error;
        throw errorDB.ERROR_USER_FOUND;
    }
}

export const searchAllUsersDB = async () => { //Agregar para filtrar
    try {
        const usersFound: Array<IUser> = await userInstanceDB.find();     
        return usersFound;
    } catch (error: any) {
        throw errorDB.ERROR_USERS_FOUND;
    }
}

export async function validateUserExistCreateDB(usernameExist: string): Promise<IUser> {
    try {
        const userFound: any = await userInstanceDB.find({ username: { $eq: usernameExist }});
        if(userFound.length > 0) throw errorClient.ERROR_USER_REGISTED
        return userFound;
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error;
        throw errorDB.ERROR_VALIDATE_USER;
    }
}