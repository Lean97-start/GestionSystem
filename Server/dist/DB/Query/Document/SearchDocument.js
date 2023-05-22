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
exports.downloadFileDB = exports.searchAllDocumentsDB = exports.searchDocumentDB = void 0;
const error_1 = require("../../../Util/Response/Document/error");
const DocumentSchema_1 = __importDefault(require("../../Schema/DocumentSchema"));
const searchDocumentDB = (_id_doc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentFound = yield DocumentSchema_1.default.findOne({ _id: { $eq: _id_doc } })
            .then((document) => { return document; })
            .catch(() => { throw error_1.errorDB.ERROR_DOCUMENT_NOT_FOUND; });
        if (!documentFound)
            throw error_1.errorDB.ERROR_DOCUMENT_NOT_FOUND;
        return documentFound;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        throw error_1.errorDB.ERROR_DOCUMENT_FOUND;
    }
});
exports.searchDocumentDB = searchDocumentDB;
const searchAllDocumentsDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let parameterFilter = {};
        if (payload.nameDocument) {
            const regexString = new RegExp(payload.nameDocument, "i");
            parameterFilter = Object.assign(Object.assign({}, parameterFilter), { nameDocument: {
                    $regex: regexString
                } });
        }
        if (payload.documentOwner) {
            const regexString = new RegExp(payload.documentOwner, "i");
            parameterFilter = Object.assign(Object.assign({}, parameterFilter), { documentOwner: {
                    $regex: regexString
                } });
        }
        if (payload.createdAt) {
            const date = payload.createdAt.toString().split('T')[0];
            parameterFilter = Object.assign(Object.assign({}, parameterFilter), { createdAt: {
                    $gte: `${date}T00:00:00.000Z`,
                    $lte: `${date}T23:59:59.999Z`
                } });
        }
        const documentsFound = yield DocumentSchema_1.default.find(parameterFilter);
        return documentsFound;
    }
    catch (error) {
        console.log(error);
        throw error_1.errorDB.ERROR_DOCUMENT_FOUND;
    }
});
exports.searchAllDocumentsDB = searchAllDocumentsDB;
const downloadFileDB = (_id_file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentFound = yield DocumentSchema_1.default.findOne({ _id: { $eq: _id_file } })
            .then((document) => { return document; })
            .catch(() => { throw error_1.errorDB.ERROR_DOCUMENT_NOT_FOUND; });
        if (!documentFound)
            throw error_1.errorDB.ERROR_DOCUMENT_NOT_FOUND;
        return documentFound;
    }
    catch (error) {
        if (error.statusCode.toString().startsWith('4'))
            throw error;
        throw error_1.errorDB.ERROR_DOCUMENT_FOUND;
    }
});
exports.downloadFileDB = downloadFileDB;
