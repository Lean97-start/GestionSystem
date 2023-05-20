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

export const signinUserDB = async (_id_User: string) => { //Mejorar con token
    try {
        const loginUser = await userInstanceDB.findOneAndUpdate(
            {
                _id: {$eq: _id_User}
            }, {
                stateSession: true
            }, {
                new: true
            });
        return loginUser;
    } catch (error: any) {
        throw errorDB.ERROR_LOGIN_USER;
    }
}

export const logoutUserDB = async (_id_User: string) => {
    try {
        const logoutUser = await userInstanceDB.findOneAndUpdate({_id: {$eq: _id_User}}, {stateSession: false});
        return logoutUser;
    } catch (error: any) {
        throw errorDB.ERROR_LOGOUT_USER;
    }
}

