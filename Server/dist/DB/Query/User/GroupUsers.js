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
exports.deleteGroupDB = exports.getAllGroupDB = exports.validateGroupUsersExistCreateDB = exports.getGroupDB = exports.updateGroupDB = exports.createGroupDB = void 0;
const error_1 = require("../../../Util/Response/Group/error");
const GroupUserSchema_1 = __importDefault(require("../../Schema/GroupUserSchema"));
const createGroupDB = (nameGroup, users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = { nameGroupUsers: nameGroup, users };
        const groupCreated = yield GroupUserSchema_1.default.create(group);
        return groupCreated;
    }
    catch (error) {
        return error_1.errorGroupUsersDB.ERROR_CREATE_GROUP;
    }
});
exports.createGroupDB = createGroupDB;
const updateGroupDB = (_id_group, dataUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupCreated = yield GroupUserSchema_1.default.findOneAndUpdate({ _id: { $eq: _id_group } }, dataUpdate, { new: true });
        return groupCreated;
    }
    catch (error) {
        return error_1.errorGroupUsersDB.ERROR_UPDATE_GROUP;
    }
});
exports.updateGroupDB = updateGroupDB;
const getGroupDB = (_id_group, nameGroupUsers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupFound = yield GroupUserSchema_1.default.findOne({
            $or: [
                { nameGroupUsers: { $eq: nameGroupUsers } },
                { _id: { $eq: _id_group } }
            ]
        });
        if (!groupFound)
            throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS;
        return groupFound;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        return error_1.errorGroupUsersDB.ERROR_GET_GROUP;
    }
});
exports.getGroupDB = getGroupDB;
function validateGroupUsersExistCreateDB(nameGroupUsers) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupUsersFound = yield GroupUserSchema_1.default.find({ nameGroupUsers: { $eq: nameGroupUsers } });
            if (groupUsersFound.length > 0)
                throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS_REGISTED;
            return groupUsersFound;
        }
        catch (error) {
            if (error.statusCode.toString().startsWith('4'))
                throw error;
            throw error_1.errorGroupUsersDB.ERROR_VALIDATE_GROUP;
        }
    });
}
exports.validateGroupUsersExistCreateDB = validateGroupUsersExistCreateDB;
const getAllGroupDB = (filterName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filters = {};
        if (filterName === null || filterName === void 0 ? void 0 : filterName.length) {
            const regexString = new RegExp(filterName, "i");
            filters = { nameGroupUsers: regexString };
        }
        const groupFound = yield GroupUserSchema_1.default.find(filters);
        if (groupFound.length === 0)
            throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS;
        return groupFound;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        return error_1.errorGroupUsersDB.ERROR_GET_GROUP;
    }
});
exports.getAllGroupDB = getAllGroupDB;
const deleteGroupDB = (_id_group) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupDeleted = yield GroupUserSchema_1.default.findOneAndDelete({ _id: { $eq: _id_group } });
        if (!groupDeleted)
            throw error_1.errorGroupUsersClient.ERROR_GROUP_USERS;
        return groupDeleted;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        return error_1.errorGroupUsersDB.ERROR_DELETE_GROUP;
    }
});
exports.deleteGroupDB = deleteGroupDB;
