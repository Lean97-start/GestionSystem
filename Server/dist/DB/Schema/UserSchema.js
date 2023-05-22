"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullNameUser: {
        type: String,
        required: true,
    },
    rolUser: {
        type: String,
        required: false
    },
    descriptionUser: {
        type: String,
        required: false
    },
    stateSession: {
        type: Boolean,
        required: false,
        default: true
    },
    token: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false
});
const userInstanceDB = (0, mongoose_1.model)('user', userSchema);
exports.default = userInstanceDB;
