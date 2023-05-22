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
exports.getDocumentsModel = exports.getDocumentModel = void 0;
const SearchDocument_1 = require("../DB/Query/Document/SearchDocument");
const document_format_1 = require("../Util/Format/document.format");
const getDocumentModel = (_id_doc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docFound = yield (0, SearchDocument_1.searchDocumentDB)(_id_doc);
        return (0, document_format_1.formatResponses)(docFound);
    }
    catch (error) {
        return error;
    }
});
exports.getDocumentModel = getDocumentModel;
const getDocumentsModel = (_id_user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docsFound = yield (0, SearchDocument_1.searchAllDocumentsDB)(payload);
        let arrayPublicDoc = [];
        let arrayDraftDoc = [];
        let arrayPrivateDoc = [];
        docsFound.forEach((doc) => {
            console.log(doc.documentOwner.toString(), _id_user);
            if (doc.typeDocument == "privado") {
                if (doc.documentOwner.toString() == _id_user) {
                    arrayPrivateDoc.push(doc);
                }
            }
            else if (doc.typeDocument == "borrador") {
                if (doc.documentOwner.toString() == _id_user) {
                    arrayDraftDoc.push(doc);
                }
            }
            else if (doc.typeDocument == "publico") {
                arrayPublicDoc.push(doc);
            }
        });
        const arrayConcat = arrayPrivateDoc.concat(arrayDraftDoc.concat(arrayPublicDoc));
        return (0, document_format_1.formatResponses)(arrayConcat);
    }
    catch (error) {
        return error;
    }
});
exports.getDocumentsModel = getDocumentsModel;
