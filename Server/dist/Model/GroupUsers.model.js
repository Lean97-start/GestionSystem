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
exports.deleteUserToGroupUserModel = exports.assignUserToGroupUserModel = exports.deleteGroupUsersModel = exports.getAllGroupUsersModel = exports.getGroupUsersModel = exports.updateGroupUsersModel = exports.createGroupUsersModel = void 0;
const GroupUsers_1 = require("../DB/Query/User/GroupUsers");
const SearchUser_1 = require("../DB/Query/User/SearchUser");
const document_format_1 = require("../Util/Format/document.format");
const error_1 = require("../Util/Response/Group/error");
const createGroupUsersModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!body.nameGroupUsers || body.nameGroupUsers.length === 0) {
            throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS_NAME_REQUIRED;
        }
        if (!body.users || body.users.length === 0) {
            throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS_REQUIRED;
        }
        const { nameGroupUsers, users } = body;
        yield (0, GroupUsers_1.validateGroupUsersExistCreateDB)(nameGroupUsers);
        const usersFound = yield (0, SearchUser_1.validateUsersExistCreateDB)(users);
        const groupUsersFound = yield (0, GroupUsers_1.createGroupDB)(nameGroupUsers, usersFound);
        return groupUsersFound;
    }
    catch (error) {
        return error;
    }
});
exports.createGroupUsersModel = createGroupUsersModel;
const updateGroupUsersModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateData = {};
        let users;
        if (!body._id_group)
            throw error_1.errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        if (body.nameGroupUsers) {
            yield (0, GroupUsers_1.validateGroupUsersExistCreateDB)(body.nameGroupUsers);
            Object.defineProperty(updateData, 'nameGroupUsers', {
                value: body.nameGroupUsers,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        if (body.users.length > 0) {
            users = yield (0, SearchUser_1.validateUsersExistCreateDB)(body.users);
            Object.defineProperty(updateData, 'users', {
                value: users,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        const groupUsersUpdated = yield (0, GroupUsers_1.updateGroupDB)(body._id_group, updateData);
        return (0, document_format_1.formatResponses)(groupUsersUpdated);
    }
    catch (error) {
        return error;
    }
});
exports.updateGroupUsersModel = updateGroupUsersModel;
const getGroupUsersModel = (_id_group) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupUsersFound = yield (0, GroupUsers_1.getGroupDB)(_id_group);
        console.log(groupUsersFound);
        return groupUsersFound;
    }
    catch (error) {
        return error;
    }
});
exports.getGroupUsersModel = getGroupUsersModel;
const getAllGroupUsersModel = (filterNameGroup) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupUsersFound = yield (0, GroupUsers_1.getAllGroupDB)(filterNameGroup);
        return groupUsersFound;
    }
    catch (error) {
        return error;
    }
});
exports.getAllGroupUsersModel = getAllGroupUsersModel;
const deleteGroupUsersModel = (_id_group) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupUsersDeleted = yield (0, GroupUsers_1.deleteGroupDB)(_id_group);
        return groupUsersDeleted;
    }
    catch (error) {
        return error;
    }
});
exports.deleteGroupUsersModel = deleteGroupUsersModel;
const assignUserToGroupUserModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!body._id_group)
            throw error_1.errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        if (!body.newUsers)
            throw error_1.errorGroupUsersClient.ERROR_NEW_GROUP_USERS_REQUIRED;
        let { _id_group, newUsers } = body;
        const existingGroupUsers = yield (0, GroupUsers_1.getGroupDB)(_id_group);
        let arrayOfexistingUsers = existingGroupUsers.users; //Array para guardar los datos y luego concatenarlos.
        let definitiveArray = []; //Array para los usuarios que no estan repetidos.
        let existingUsers = []; // Array de usuarios ya existentes en el grupo.
        existingGroupUsers.users.forEach((existingUser) => { existingUsers.push(existingUser._id.toString()); });
        newUsers.map((userID) => {
            if (!existingUsers.includes(userID)) {
                definitiveArray.push(userID);
            }
        });
        const usersFound = yield (0, SearchUser_1.validateUsersExistCreateDB)(definitiveArray); //Busco los datos de los usuarios.
        const arrayConcat = arrayOfexistingUsers.concat(usersFound);
        const arrayUsersUpdated = yield (0, GroupUsers_1.updateGroupDB)(_id_group, { users: arrayConcat });
        if (!arrayUsersUpdated)
            throw error_1.errorGroupUsersDB.ERROR_UPDATE_GROUP;
        return arrayUsersUpdated;
    }
    catch (error) {
        return error;
    }
});
exports.assignUserToGroupUserModel = assignUserToGroupUserModel;
const deleteUserToGroupUserModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!body._id_group)
            throw error_1.errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        if (!body.newUsers)
            throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS_REQUIRED;
        let { _id_group, newUsers } = body;
        const existingGroupUsers = yield (0, GroupUsers_1.getGroupDB)(_id_group);
        let definitiveArray = []; //Array para los usuarios que no estan repetidos.
        existingGroupUsers.users.forEach((existingUser) => {
            if (newUsers.includes(existingUser._id.toString())) {
                definitiveArray.push(existingUser);
            }
        });
        const arrayUsersUpdated = yield (0, GroupUsers_1.updateGroupDB)(_id_group, { users: definitiveArray });
        if (!arrayUsersUpdated)
            throw error_1.errorGroupUsersDB.ERROR_UPDATE_GROUP;
        return arrayUsersUpdated;
    }
    catch (error) {
        return error;
    }
});
exports.deleteUserToGroupUserModel = deleteUserToGroupUserModel;
