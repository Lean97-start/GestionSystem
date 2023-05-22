import { NextFunction, Response } from "express";
import { RequestModified } from "../Interface/User.interface";
import jwt from "jsonwebtoken";
import { IToken } from "../Interface/token.interface";
import { enviroments } from "../Util/Config/configENV";

//Función para validar el token del usuario.
export function validateToken(req: RequestModified, res: Response, next: NextFunction) {
    try {
        const {jwt_secret} = enviroments();
        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(403).json('No tiene token válido.');
        const tokenDecrypt: IToken | string = jwt.verify(bearerToken.split(" ")[1], jwt_secret);
        req.user = tokenDecrypt;
        next();
    } catch (error: any) {
        if(error.name === "TokenExpiredError") return res.status(400).json("Token expirado");
        return res.status(500).json(error);
    }
}