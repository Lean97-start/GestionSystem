"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupUsersSchema = new mongoose_1.Schema({
    nameGroupUsers: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});
const groupUsersInstanceDB = (0, mongoose_1.model)('groupUsers', groupUsersSchema);
exports.default = groupUsersInstanceDB;
