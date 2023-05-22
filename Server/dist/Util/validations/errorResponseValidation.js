"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateErrorResponse = void 0;
const validateErrorResponse = (payload) => {
    if (payload.hasOwnProperty("error_message")) {
        throw { statusCode: payload.statusCode, error_message: payload.error_message };
    }
};
exports.validateErrorResponse = validateErrorResponse;
