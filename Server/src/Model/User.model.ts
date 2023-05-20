import { logoutUserDB, signinUserDB, signupUserDB } from "../DB/Query/User/ABMUser";
import { searchAllUsersDB, searchUserDB } from "../DB/Query/User/SearchUser";
import { IUser } from "../Interface/User.interface";
import { IError } from "../Interface/error.Interface";
import { errorClient } from "../Util/Response/User/error";


export const signupUserModel = async (userPayload: IUser) => {
    try {
        const userCreated = await signupUserDB(userPayload); 
        return userCreated;
    } catch (error: any) {
        return error;
    }
}

export const signinUserModel = async (userPayload: any) => {
    try {
        const { username, password } = userPayload;
        const userFound: IUser = await searchUserDB(null, username);
        if(!userFound.password == password){
            throw errorClient.ERROR_USERNAME_INVALID
        };
        const loginUser = await signinUserDB(userFound._id.toString()); 
        return loginUser;
    } catch (error: any) {
        return error;
    }
}

export const logoutUserModel = async (_id_user: string) => {
    try {
        await searchUserDB(_id_user);
        const logoutUser = await logoutUserDB(_id_user); 
        return logoutUser;
    } catch (error: any) {
        return error;
    }
}


export const getUserModel = async (_id_user: string): Promise<IUser | IError> => {
    try {
        const userFound: IUser | IError = await searchUserDB(_id_user);
        return userFound;
    } catch (error: any) {
        return error
    }
}

export const getUsersModel = async (): Promise<Array<IUser> | IError> => {
    try {
        const usersFound = await searchAllUsersDB(); 
        return usersFound;
    } catch (error: any) {
        return error
    }
}