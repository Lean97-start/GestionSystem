"use strict"
import express from 'express';
import cors from 'cors';
import documentRouter from "./Routes/document.routes";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from './Routes/user.routes';
import groupUsersRouter from './Routes/groupUsers.routes';
const fileUpload = require('express-fileupload');

export const initExpress = (): express.Express => {
    const app = express();

    app.use(cors());
    app.use(morgan("dev")); 
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
    app.use(bodyParser.json({ limit: "5mb" }));
    app.use(fileUpload());
    app.use(userRouter); //LLamo a las rutas
    app.use(groupUsersRouter); //LLamo a las rutas
    app.use(documentRouter); //LLamo a las rutas

    return app;
}