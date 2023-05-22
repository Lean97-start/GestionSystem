"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configENV_1 = require("../Util/Config/configENV");
const User_model_1 = require("../Model/User.model");
//Función para validar el token del usuario.
function validateToken(req, res, next) {
    try {
        const { jwt_secret } = (0, configENV_1.enviroments)();
        const bearerToken = req.headers.authorization;
        if (!bearerToken)
            return res.status(403).json('No tiene token válido.');
        const tokenDecrypt = jsonwebtoken_1.default.verify(bearerToken.split(" ")[1], jwt_secret);
        req.user = tokenDecrypt;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            const { jwt_secret } = (0, configENV_1.enviroments)();
            closeSessionTokenExpired(req.headers.authorization, jwt_secret);
            return res.status(401).json("Token expirado");
        }
        return res.status(500).json(error);
    }
}
exports.validateToken = validateToken;
function closeSessionTokenExpired(token, secret) {
    try {
        const tokenDecoded = jsonwebtoken_1.default.decode(token.split(" ")[1], secret);
        (0, User_model_1.closeSessionTokenExpiredModel)(tokenDecoded.id);
        return;
    }
    catch (error) {
        return error;
    }
}
