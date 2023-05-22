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
exports.validateUsersExistCreateDB = exports.validateUserExistCreateDB = exports.searchAllUsersDB = exports.searchUserDB = void 0;
const error_1 = require("../../../Util/Response/User/error");
const UserSchema_1 = __importDefault(require("../../Schema/UserSchema"));
const searchUserDB = (_id_user, userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield UserSchema_1.default.findOne({
            $or: [
                { username: { $eq: userName } },
                { _id: { $eq: _id_user } }
            ]
        })
            .then((user) => { return user; })
            .catch(() => { throw error_1.errorDB.ERROR_USER_NOT_FOUND; });
        if (!userFound)
            throw error_1.errorDB.ERROR_USER_NOT_FOUND;
        return userFound;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        throw error_1.errorDB.ERROR_USER_FOUND;
    }
});
exports.searchUserDB = searchUserDB;
const searchAllUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersFound = yield UserSchema_1.default.find();
        return usersFound;
    }
    catch (error) {
        throw error_1.errorDB.ERROR_USERS_FOUND;
    }
});
exports.searchAllUsersDB = searchAllUsersDB;
function validateUserExistCreateDB(usernameExist) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield UserSchema_1.default.find({ username: { $eq: usernameExist } });
            if (userFound.length > 0)
                throw error_1.errorClient.ERROR_USER_REGISTED;
            return userFound;
        }
        catch (error) {
            if (error.statusCode.toString().startsWith('4'))
                throw error;
            throw error_1.errorDB.ERROR_VALIDATE_USER;
        }
    });
}
exports.validateUserExistCreateDB = validateUserExistCreateDB;
function validateUsersExistCreateDB(usuarios) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userPromise = [];
            usuarios.forEach(userID => {
                let userPromesa = UserSchema_1.default.findOne({ _id: userID })
                    .then((user) => { return { user: user.fullNameUser, _id: user._id }; })
                    .catch(() => error_1.errorClient.ERROR_USER_REGISTED);
                userPromise.push(userPromesa);
            });
            const userFound = yield Promise.all(userPromise)
                .then((resolve) => resolve)
                .catch((rej) => rej);
            console.log(userFound);
            if (userFound.length === 0)
                throw error_1.errorClient.ERROR_USER_REGISTED;
            return userFound;
        }
        catch (error) {
            if (error.statusCode.toString().startsWith('4'))
                throw error;
            throw error_1.errorDB.ERROR_VALIDATE_USER;
        }
    });
}
exports.validateUsersExistCreateDB = validateUsersExistCreateDB;
