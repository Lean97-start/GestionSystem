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
exports.logicDeleteDocumentDB = exports.updateDocumentDB = exports.createDocumentDB = void 0;
const error_1 = require("../../../Util/Response/Document/error");
const DocumentSchema_1 = __importDefault(require("../../Schema/DocumentSchema"));
const createDocumentDB = (documentPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentCreated = yield DocumentSchema_1.default.create(documentPayload);
        return documentCreated;
    }
    catch (error) {
        console.log(error);
        throw error_1.errorDB.ERROR_CREATE_DOCUMENT;
    }
});
exports.createDocumentDB = createDocumentDB;
const updateDocumentDB = (_id_doc, updatedDocument) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentUpdated = yield DocumentSchema_1.default.findOneAndUpdate({
            _id: { $eq: _id_doc }
        }, updatedDocument, {
            new: true
        });
        if (!documentUpdated)
            throw error_1.errorDB.ERROR_DOCUMENT_NOT_FOUND;
        return documentUpdated;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        throw error_1.errorDB.ERROR_UPDATE_DOCUMENT;
    }
});
exports.updateDocumentDB = updateDocumentDB;
const logicDeleteDocumentDB = (_id_doc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentDeleted = yield DocumentSchema_1.default.findOneAndDelete({ _id: { $eq: _id_doc } });
        return documentDeleted;
    }
    catch (error) {
        throw error_1.errorDB.ERROR_DELETE_DOCUMENT;
    }
});
exports.logicDeleteDocumentDB = logicDeleteDocumentDB;
