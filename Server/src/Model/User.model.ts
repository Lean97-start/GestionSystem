import { assignTokenRegister, logoutUserDB, signinUserDB, signupUserDB } from "../DB/Query/User/ABMUser";
import { searchAllUsersDB, searchUserDB, validateUserExistCreateDB, validateUsersExistCreateDB } from "../DB/Query/User/SearchUser";
import { IUser } from "../Interface/User.interface";
import { IError } from "../Interface/error.Interface";
import { hashPass, matchPass } from "../Util/Config/user.encrypt";
import generateJwt from "../Util/Config/users.jst";
import { errorClient, errorDB } from "../Util/Response/User/error";


export const signupUserModel = async (userPayload: IUser) => {
    try {
        userPayload.password = hashPass(userPayload.password);
        await validateUserExistCreateDB(userPayload.username)
        const userCreated = await signupUserDB(userPayload);
        const accessToken = generateJwt(
            userCreated._id.toString(),
            userCreated.username,
            userCreated.fullNameUser,
        );
        const userWithToken: any = await assignTokenRegister(userCreated._id.toString(), accessToken.token);
        return userWithToken;
    } catch (error: any) {
        return error;
    }
}

export const signinUserModel = async (userPayload: any) => {
    try {
        const usernameBody = userPayload.username;
        const passwordBody = userPayload.password;
        const responseValidateUserExist: IUser = await searchUserDB(null, usernameBody);
        if (responseValidateUserExist.stateSession === true) throw errorClient.ERROR_SESSION_ACTIVE;
        const match = matchPass(responseValidateUserExist.password, passwordBody);
        if (!match) throw errorClient.ERROR_PASSWORD_INVALID;
        const { _id, username, fullNameUser } = responseValidateUserExist;
        const accessToken = generateJwt(
            _id.toString(),
            username,
            fullNameUser
        );
        const { token } = accessToken;
        const userFound: IUser = await searchUserDB(null, username);
        const loginUser: IUser = await signinUserDB(userFound._id.toString(), token); 
        return {token, userName: loginUser.username, fullNameUser: loginUser.fullNameUser};
    } catch (error: any) {
        return error;
    }
}

export const logoutUserModel = async (_id_user: string) => {
    try {
        const responseValidateUserExist = await searchUserDB(_id_user);
        if (responseValidateUserExist.stateSession === false){
            return errorClient.ERROR_USER_NOT_HAVE_SESSION_ACTIVE;
        }
        const logoutUser: IUser = await logoutUserDB(_id_user); 
        if(logoutUser.stateSession) { throw errorDB.ERROR_LOGOUT_USER}
        return { message: "Sesión cerrada"};;
    } catch (error: any) {
        return error;
    }
}


export const getUserModel = async (_id_user: string): Promise<Object | IError> => {
    try {
        const userFound: IUser | IError = await searchUserDB(_id_user);
        const user: Object = {
            _id: userFound._id,
            username: userFound.username,
            fullNameUser: userFound.fullNameUser

        }
        return user;
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