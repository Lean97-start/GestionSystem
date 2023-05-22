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
exports.assignTokenRegister = exports.logoutUserDB = exports.signinUserDB = exports.signupUserDB = void 0;
const error_1 = require("../../../Util/Response/User/error");
const UserSchema_1 = __importDefault(require("../../Schema/UserSchema"));
const signupUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreated = yield UserSchema_1.default.create(payload);
        return userCreated;
    }
    catch (error) {
        throw error_1.errorDB.ERROR_CREATE_USER;
    }
});
exports.signupUserDB = signupUserDB;
const signinUserDB = (_id_User, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield UserSchema_1.default.findOneAndUpdate({
            _id: { $eq: _id_User }
        }, {
            token,
            stateSession: true
        }, {
            new: true
        });
        if (!loginUser)
            throw error_1.errorDB.ERROR_USER_FOUND;
        return loginUser;
    }
    catch (error) {
        throw error_1.errorDB.ERROR_LOGIN_USER;
    }
});
exports.signinUserDB = signinUserDB;
const logoutUserDB = (_id_User) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logoutUser = yield UserSchema_1.default.findOneAndUpdate({
            _id: { $eq: _id_User }
        }, {
            token: null,
            stateSession: false
        }, {
            new: true
        });
        if (!logoutUser)
            throw error_1.errorDB.ERROR_LOGOUT_USER;
        return logoutUser;
    }
    catch (error) {
        throw error_1.errorDB.ERROR_LOGOUT_USER;
    }
});
exports.logoutUserDB = logoutUserDB;
function assignTokenRegister(_idUser, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const assignTokenUser = yield UserSchema_1.default.findOneAndUpdate({ _id: { $eq: _idUser } }, { token, stateSession: true }, { new: true });
            return assignTokenUser;
        }
        catch (err) {
            return error_1.errorDB.ERROR_ASSIGN_TOKEN_USER;
        }
    });
}
exports.assignTokenRegister = assignTokenRegister;
