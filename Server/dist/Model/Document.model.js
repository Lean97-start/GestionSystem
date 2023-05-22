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
exports.assignGroupUsersToDocumentModel = exports.updateUsersToDocumentModel = exports.logicDeleteDocumentModel = exports.updateDocumentModel = exports.downloadFileModel = exports.createDocumentModel = void 0;
const ABMDocument_1 = require("../DB/Query/Document/ABMDocument");
const SearchDocument_1 = require("../DB/Query/Document/SearchDocument");
const GroupUsers_1 = require("../DB/Query/User/GroupUsers");
const SearchUser_1 = require("../DB/Query/User/SearchUser");
const document_format_1 = require("../Util/Format/document.format");
const error_1 = require("../Util/Response/Document/error");
const error_2 = require("../Util/Response/Group/error");
const GetDocuments_model_1 = require("./GetDocuments.model");
const createDocumentModel = (document) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, SearchUser_1.searchUserDB)(document.documentOwner);
        let responseCreate = yield (0, ABMDocument_1.createDocumentDB)(document);
        responseCreate = {
            nameDocument: responseCreate.nameDocument
        };
        return responseCreate;
    }
    catch (error) {
        return error;
    }
});
exports.createDocumentModel = createDocumentModel;
const downloadFileModel = (_id_file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileFound = yield (0, SearchDocument_1.downloadFileDB)(_id_file);
        const nameFile = fileFound.nameDocument;
        const cabecera = {
            'Content-Disposition': `attachment; filename='${fileFound.nameDocument}'`,
        };
        return { file: fileFound.dataDocument, cabecera, nameFile };
    }
    catch (error) {
        return error;
    }
});
exports.downloadFileModel = downloadFileModel;
const updateDocumentModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, SearchDocument_1.searchDocumentDB)(body._id);
        const responseUpdate = yield (0, ABMDocument_1.updateDocumentDB)(body._id, body);
        return (0, document_format_1.formatResponse)(responseUpdate);
    }
    catch (error) {
        return error;
    }
});
exports.updateDocumentModel = updateDocumentModel;
const logicDeleteDocumentModel = (_id_doc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validateDocument(document);//Realizo la validación de los datos. De haber error, lanza un throw
        yield (0, SearchDocument_1.searchDocumentDB)(_id_doc);
        yield (0, ABMDocument_1.logicDeleteDocumentDB)(_id_doc);
        return true;
    }
    catch (error) {
        return error;
    }
});
exports.logicDeleteDocumentModel = logicDeleteDocumentModel;
const updateUsersToDocumentModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!body._id_doc)
            throw error_1.errorClient.ERROR_ID_DOCUMENT;
        if (!body.users)
            throw error_2.errorGroupUsersClient.ERROR_GROUP_USERS_REQUIRED;
        const { _id_doc, users } = body;
        const usersInDoc = yield (0, GetDocuments_model_1.getDocumentModel)(_id_doc);
        let arrayOfexistingUsers = usersInDoc.usersGroup; //Array para guardar los datos y luego concatenarlos.
        let newUsers = []; //Array para los usuarios que no estan repetidos.
        let oldUsers = []; //Array para los usuarios que no estan repetidos.
        let existingUsers = []; // Array de usuarios ya existentes en el documento.
        let arrayExistUsersFiltered = [];
        arrayOfexistingUsers.forEach((existingUser) => { existingUsers.push(existingUser._id.toString()); });
        users.forEach((userID) => {
            if (!existingUsers.includes(userID)) {
                newUsers.push(userID);
            }
            else {
                oldUsers.push(userID);
            }
        });
        let usersFound;
        arrayOfexistingUsers.forEach((existingUser) => {
            if (oldUsers.includes(existingUser._id.toString())) {
                arrayExistUsersFiltered.push(existingUser);
            }
        });
        if (newUsers.length > 0) {
            usersFound = yield (0, SearchUser_1.validateUsersExistCreateDB)(newUsers);
            if (usersFound[0].statusCode.toString().startsWith('4'))
                throw error_1.errorClient.ERROR_USER_NOT_FOUND;
            console.log(usersFound[0].statusCode);
            const arrayConcat = arrayExistUsersFiltered.concat(usersFound);
            const docUpdated = yield (0, ABMDocument_1.updateDocumentDB)(_id_doc, { usersGroup: arrayConcat });
            if (docUpdated.typeDocument) {
                return (0, document_format_1.formatResponse)(docUpdated);
            }
            else {
                return true;
            }
        }
        else {
            const arrayConcat = arrayExistUsersFiltered;
            const docUpdated = yield (0, ABMDocument_1.updateDocumentDB)(_id_doc, { usersGroup: arrayConcat });
            if (docUpdated.typeDocument) {
                return (0, document_format_1.formatResponse)(docUpdated);
            }
            else {
                return true;
            }
        }
    }
    catch (error) {
        return error;
    }
});
exports.updateUsersToDocumentModel = updateUsersToDocumentModel;
const assignGroupUsersToDocumentModel = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!body._id_doc)
            throw error_1.errorClient.ERROR_ID_DOCUMENT;
        if (!body._id_group)
            throw error_2.errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        const { _id_doc, _id_group } = body;
        yield (0, SearchDocument_1.searchDocumentDB)(_id_doc);
        const groupUsers = yield (0, GroupUsers_1.getGroupDB)(_id_group);
        const payload = { usersGroup: groupUsers.users };
        const docUpdated = yield (0, ABMDocument_1.updateDocumentDB)(_id_doc, payload);
        if (docUpdated.typeDocument) {
            return (0, document_format_1.formatResponse)(docUpdated);
        }
        else {
            return docUpdated;
        }
    }
    catch (error) {
        return error;
    }
});
exports.assignGroupUsersToDocumentModel = assignGroupUsersToDocumentModel;
