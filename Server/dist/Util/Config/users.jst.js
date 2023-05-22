"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configENV_1 = require("./configENV");
let { jwt_secret } = (0, configENV_1.enviroments)();
const generateJwt = (id, username, fullNameUser) => {
    const token = jsonwebtoken_1.default.sign({
        id,
        username,
        fullNameUser,
    }, jwt_secret, {
        expiresIn: 60 * 60 * 8, //El token tiene un tiempo de expiracion una hora
    });
    return { token };
};
exports.default = generateJwt;
