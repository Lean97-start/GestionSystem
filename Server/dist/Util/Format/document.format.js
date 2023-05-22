"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponses = exports.formatResponse = void 0;
const formatResponse = (doc) => {
    return {
        _id: doc._id,
        nameDocument: doc.nameDocument,
        descriptionDocument: doc.descriptionDocument,
        typeDocument: doc.typeDocument,
        documentOwner: doc.documentOwner,
        usersGroup: doc.usersGroup
    };
};
exports.formatResponse = formatResponse;
const formatResponses = (docs) => {
    return docs.map((doc) => {
        return {
            _id: doc._id,
            nameDocument: doc.nameDocument,
            descriptionDocument: doc.descriptionDocument,
            typeDocument: doc.typeDocument,
            documentOwner: doc.documentOwner,
            usersGroup: doc.usersGroup
        };
    });
};
exports.formatResponses = formatResponses;
