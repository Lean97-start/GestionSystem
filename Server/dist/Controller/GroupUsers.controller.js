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
exports.deleteUserFromGroupUserController = exports.assignUserToGroupUserController = exports.deleteGroupUsersController = exports.getAllGroupUsersController = exports.getGroupUsersController = exports.updateGroupUsersController = exports.createGroupUsersController = void 0;
const GroupUsers_model_1 = require("../Model/GroupUsers.model");
const errorResponseValidation_1 = require("../Util/validations/errorResponseValidation");
const success_1 = require("../Util/Response/User/success");
const createGroupUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupCreated = yield (0, GroupUsers_model_1.createGroupUsersModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(groupCreated);
        return res
            .status(success_1.success.GROUP_CREATED.statusCode)
            .json({
            message: success_1.success.GROUP_CREATED.message,
            group: groupCreated
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.createGroupUsersController = createGroupUsersController;
const updateGroupUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupUpdated = yield (0, GroupUsers_model_1.updateGroupUsersModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(groupUpdated);
        return res
            .status(success_1.success.GROUP_UPDATED.statusCode)
            .json({
            message: success_1.success.GROUP_UPDATED.message,
            group: groupUpdated
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.updateGroupUsersController = updateGroupUsersController;
const getGroupUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id_group = req.params.id;
        const groupFound = yield (0, GroupUsers_model_1.getGroupUsersModel)(_id_group);
        (0, errorResponseValidation_1.validateErrorResponse)(groupFound);
        return res
            .status(success_1.success.GROUP_USERS_FOUND.statusCode)
            .json({
            message: success_1.success.GROUP_USERS_FOUND.message,
            group: groupFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.getGroupUsersController = getGroupUsersController;
const getAllGroupUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filterNameGroup } = req.body;
        const groupsFound = yield (0, GroupUsers_model_1.getAllGroupUsersModel)(filterNameGroup);
        (0, errorResponseValidation_1.validateErrorResponse)(groupsFound);
        return res
            .status(success_1.success.GROUPS_USERS_FOUND.statusCode)
            .json({
            message: success_1.success.GROUPS_USERS_FOUND.message,
            group: groupsFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.getAllGroupUsersController = getAllGroupUsersController;
const deleteGroupUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id_group } = req.body;
        const groupDeleted = yield (0, GroupUsers_model_1.deleteGroupUsersModel)(_id_group);
        (0, errorResponseValidation_1.validateErrorResponse)(groupDeleted);
        return res
            .status(success_1.success.GROUP_USERS_DELETED.statusCode)
            .json({
            message: success_1.success.GROUP_USERS_DELETED.message,
            group: groupDeleted
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.deleteGroupUsersController = deleteGroupUsersController;
const assignUserToGroupUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupDeleted = yield (0, GroupUsers_model_1.assignUserToGroupUserModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(groupDeleted);
        return res
            .status(success_1.success.GROUP_USERS_DELETED.statusCode)
            .json({
            message: success_1.success.GROUP_USERS_DELETED.message,
            group: groupDeleted
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.assignUserToGroupUserController = assignUserToGroupUserController;
const deleteUserFromGroupUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupDeleted = yield (0, GroupUsers_model_1.deleteUserToGroupUserModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(groupDeleted);
        return res
            .status(success_1.success.GROUP_USERS_DELETED.statusCode)
            .json({
            message: success_1.success.GROUP_USERS_DELETED.message,
            group: groupDeleted
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.deleteUserFromGroupUserController = deleteUserFromGroupUserController;
