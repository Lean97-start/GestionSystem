"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    nameDocument: {
        type: String,
        required: true
    },
    descriptionDocument: {
        type: String,
        required: false,
        default: null
    },
    typeDocument: {
        type: String,
        required: true,
        enum: ['publico', "privado", "borrador"]
    },
    documentOwner: {
        type: String,
        required: true
    },
    usersGroup: {
        type: Array,
        of: Object,
        required: true,
        default: []
    },
    dataDocument: {
        type: Buffer,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const documentInstanceDB = (0, mongoose_1.model)('document', documentSchema);
exports.default = documentInstanceDB;
