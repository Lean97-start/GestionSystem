import { IUser } from "../../../Interface/User.interface"
import { errorDB } from "../../../Util/Response/User/error";
import userInstanceDB from "../../Schema/UserSchema"


export const signupUserDB = async (payload: IUser) => {
    try {
        const userCreated = await userInstanceDB.create(payload);
        return userCreated;
    } catch (error: any) {
        console.log(error)
        throw errorDB.ERROR_CREATE_USER;
    }
}

export const signinUserDB = async (_id_User: string, token: string): Promise<IUser> => { //Mejorar con token
    try {
        const loginUser = await userInstanceDB.findOneAndUpdate(
            {
                _id: {$eq: _id_User}
            }, {
                token,
                stateSession: true
            }, {
                new: true
            });
        if(!loginUser) throw errorDB.ERROR_USER_FOUND;
        return loginUser;
    } catch (error: any) {
        throw errorDB.ERROR_LOGIN_USER;
    }
}

export const logoutUserDB = async (_id_User: string):Promise<IUser> => {
    try {
        const logoutUser: IUser | null = await userInstanceDB.findOneAndUpdate({
            _id: {$eq: _id_User}
        }, {
            token: null,
            stateSession: false
        },{
            new: true
        });
        if(!logoutUser) throw errorDB.ERROR_LOGOUT_USER;
        return logoutUser;
    } catch (error: any) {
        throw errorDB.ERROR_LOGOUT_USER;
    }
}

export async function assignTokenRegister(_idUser: string, token: string) {
    try {
        const assignTokenUser = await userInstanceDB.findOneAndUpdate(
            { _id: { $eq: _idUser } },
            { token, stateSession: true },
            { new: true }
        );
        return assignTokenUser;
    } catch (err) {
        return errorDB.ERROR_ASSIGN_TOKEN_USER;
    }
}