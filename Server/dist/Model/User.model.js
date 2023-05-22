"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSessionTokenExpiredModel = exports.getUsersModel = exports.getUserModel = exports.logoutUserModel = exports.signinUserModel = exports.signupUserModel = void 0;
const ABMUser_1 = require("../DB/Query/User/ABMUser");
const SearchUser_1 = require("../DB/Query/User/SearchUser");
const user_encrypt_1 = require("../Util/Config/user.encrypt");
const users_jst_1 = __importDefault(require("../Util/Config/users.jst"));
const error_1 = require("../Util/Response/User/error");
const signupUserModel = (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userPayload.password = (0, user_encrypt_1.hashPass)(userPayload.password);
        yield (0, SearchUser_1.validateUserExistCreateDB)(userPayload.username);
        const userCreated = yield (0, ABMUser_1.signupUserDB)(userPayload);
        const accessToken = (0, users_jst_1.default)(userCreated._id.toString(), userCreated.username, userCreated.fullNameUser);
        const userWithToken = yield (0, ABMUser_1.assignTokenRegister)(userCreated._id.toString(), accessToken.token);
        return userWithToken;
    }
    catch (error) {
        return error;
    }
});
exports.signupUserModel = signupUserModel;
const signinUserModel = (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usernameBody = userPayload.username;
        const passwordBody = userPayload.password;
        const responseValidateUserExist = yield (0, SearchUser_1.searchUserDB)(null, usernameBody);
        if (responseValidateUserExist.stateSession === true)
            throw error_1.errorClient.ERROR_SESSION_ACTIVE;
        const match = (0, user_encrypt_1.matchPass)(responseValidateUserExist.password, passwordBody);
        if (!match)
            throw error_1.errorClient.ERROR_PASSWORD_INVALID;
        const { _id, username, fullNameUser } = responseValidateUserExist;
        const accessToken = (0, users_jst_1.default)(_id.toString(), username, fullNameUser);
        const { token } = accessToken;
        const userFound = yield (0, SearchUser_1.searchUserDB)(null, username);
        const loginUser = yield (0, ABMUser_1.signinUserDB)(userFound._id.toString(), token);
        return { token, userName: loginUser.username, fullNameUser: loginUser.fullNameUser };
    }
    catch (error) {
        return error;
    }
});
exports.signinUserModel = signinUserModel;
const logoutUserModel = (_id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseValidateUserExist = yield (0, SearchUser_1.searchUserDB)(_id_user);
        if (responseValidateUserExist.stateSession === false) {
            return error_1.errorClient.ERROR_USER_NOT_HAVE_SESSION_ACTIVE;
        }
        const logoutUser = yield (0, ABMUser_1.logoutUserDB)(_id_user);
        if (logoutUser.stateSession) {
            throw error_1.errorDB.ERROR_LOGOUT_USER;
        }
        return { message: "Sesión cerrada" };
        ;
    }
    catch (error) {
        return error;
    }
});
exports.logoutUserModel = logoutUserModel;
const getUserModel = (_id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield (0, SearchUser_1.searchUserDB)(_id_user);
        const user = {
            _id: userFound._id,
            username: userFound.username,
            fullNameUser: userFound.fullNameUser
        };
        return user;
    }
    catch (error) {
        return error;
    }
});
exports.getUserModel = getUserModel;
const getUsersModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersFound = yield (0, SearchUser_1.searchAllUsersDB)();
        return usersFound;
    }
    catch (error) {
        return error;
    }
});
exports.getUsersModel = getUsersModel;
const closeSessionTokenExpiredModel = (_id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersFound = yield (0, ABMUser_1.logoutUserDB)(_id_user);
        return usersFound;
    }
    catch (error) {
        return error;
    }
});
exports.closeSessionTokenExpiredModel = closeSessionTokenExpiredModel;
