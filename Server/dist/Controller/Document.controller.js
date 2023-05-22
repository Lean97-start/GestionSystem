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
exports.assignGroupUsersToDocumentController = exports.updateUsersToDocumentController = exports.downloadFileController = exports.getDocumentController = exports.getAllDocumentController = exports.logicDeleteDocumentController = exports.updateDocumentController = exports.createDocumentController = void 0;
const Document_model_1 = require("../Model/Document.model");
const errorResponseValidation_1 = require("../Util/validations/errorResponseValidation");
const success_1 = require("../Util/Response/Document/success");
const GetDocuments_model_1 = require("../Model/GetDocuments.model");
const createDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = req.body;
        const docCreated = yield (0, Document_model_1.createDocumentModel)(document);
        (0, errorResponseValidation_1.validateErrorResponse)(docCreated); //Valido si hubo un error en la creación.
        return res
            .status(success_1.success.CREATED_DOCUMENT.statusCode)
            .json({
            message: success_1.success.CREATED_DOCUMENT.message,
            documentCreated: docCreated
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.createDocumentController = createDocumentController;
const updateDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDoc = yield (0, Document_model_1.updateDocumentModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(updatedDoc);
        return res
            .status(success_1.success.UPDATED_DOCUMENT.statusCode)
            .json({
            message: success_1.success.UPDATED_DOCUMENT.message,
            documentUpdated: updatedDoc
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.updateDocumentController = updateDocumentController;
const logicDeleteDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.body;
        const docDeleted = yield (0, Document_model_1.logicDeleteDocumentModel)(_id);
        (0, errorResponseValidation_1.validateErrorResponse)(docDeleted);
        return res
            .status(success_1.success.DELETED_DOCUMENT.statusCode)
            .send(success_1.success.DELETED_DOCUMENT.message);
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.logicDeleteDocumentController = logicDeleteDocumentController;
const getAllDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const _id_user = req.user.id;
        const docsFound = yield (0, GetDocuments_model_1.getDocumentsModel)(_id_user, payload);
        (0, errorResponseValidation_1.validateErrorResponse)(docsFound);
        return res
            .status(success_1.success.DOCUMENTS_FOUND.statusCode)
            .send({
            message: success_1.success.DOCUMENTS_FOUND.message,
            documents: docsFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.getAllDocumentController = getAllDocumentController;
const getDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const docFound = yield (0, GetDocuments_model_1.getDocumentModel)(_id);
        (0, errorResponseValidation_1.validateErrorResponse)(docFound);
        return res
            .status(success_1.success.DOCUMENT_FOUND.statusCode)
            .send({
            message: success_1.success.DOCUMENT_FOUND.message,
            document: docFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.getDocumentController = getDocumentController;
const downloadFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id_doc = req.body.id_doc;
        const fileFound = yield (0, Document_model_1.downloadFileModel)(_id_doc);
        (0, errorResponseValidation_1.validateErrorResponse)(fileFound);
        res.attachment(fileFound.nameFile);
        return res
            .status(success_1.success.DOCUMENT_FOUND.statusCode)
            .set(fileFound.cabecera)
            .end(fileFound.file);
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.downloadFileController = downloadFileController;
const updateUsersToDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docFound = yield (0, Document_model_1.updateUsersToDocumentModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(docFound);
        return res
            .status(success_1.success.DOCUMENT_FOUND.statusCode)
            .send({
            message: success_1.success.DOCUMENT_FOUND.message,
            document: docFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.updateUsersToDocumentController = updateUsersToDocumentController;
const assignGroupUsersToDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docFound = yield (0, Document_model_1.assignGroupUsersToDocumentModel)(req.body);
        (0, errorResponseValidation_1.validateErrorResponse)(docFound);
        return res
            .status(success_1.success.DOCUMENT_FOUND.statusCode)
            .send({
            message: success_1.success.DOCUMENT_FOUND.message,
            document: docFound
        });
    }
    catch (error) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
});
exports.assignGroupUsersToDocumentController = assignGroupUsersToDocumentController;
