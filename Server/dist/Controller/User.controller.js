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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = exports.getUserController = exports.logoutUserController = exports.signinUserController = exports.signupUserController = void 0;
const User_model_1 = require("../Model/User.model");
const errorResponseValidation_1 = require("../Util/validations/errorResponseValidation");
const success_1 = require("../Util/Response/User/success");
const signupUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.body;
        const userCreated = yield (0, User_model_1.signupUserModel)(userPayload);
        (0, errorResponseValidation_1.validateErrorResponse)(userCreated); //Valido si hubo un error en la creación.
        return res
            .status(success_1.success.CREATED_USER.statusCode)
            .json({
            message: success_1.success.CREATED_USER.message,
            userCreated: userCreated
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.signupUserController = signupUserController;
const signinUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.body;
        const userCreated = yield (0, User_model_1.signinUserModel)(userPayload);
        (0, errorResponseValidation_1.validateErrorResponse)(userCreated); //Valido si hubo un error en la creación.
        return res
            .status(success_1.success.CREATED_USER.statusCode)
            .json({
            message: success_1.success.CREATED_USER.message,
            userCreated: userCreated
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.signinUserController = signinUserController;
const logoutUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.user.id;
        const logoutSession = yield (0, User_model_1.logoutUserModel)(_id);
        (0, errorResponseValidation_1.validateErrorResponse)(logoutSession); //Valido si hubo un error en la creación.
        return res
            .status(success_1.success.LOGOUT_SUCCESS.statusCode)
            .json(success_1.success.LOGOUT_SUCCESS.message);
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.logoutUserController = logoutUserController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.body;
        const userFound = yield (0, User_model_1.getUserModel)(userPayload);
        (0, errorResponseValidation_1.validateErrorResponse)(userFound); //Valido si hubo un error en la creación.
        return res
            .status(success_1.success.USER_FOUND.statusCode)
            .json({
            message: success_1.success.USER_FOUND.message,
            user: userFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.getUserController = getUserController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const userPayload: IUser = req.body;
        //OBTENER LOS FILTROS DE USUARIOS
        const usersFound = yield (0, User_model_1.getUsersModel)();
        (0, errorResponseValidation_1.validateErrorResponse)(usersFound); //Valido si hubo un error en la creación.
        return res
            .status(success_1.success.USERS_FOUND.statusCode)
            .json({
            message: success_1.success.USERS_FOUND.message,
            users: usersFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.getAllUsersController = getAllUsersController;
