"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpress = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const document_routes_1 = __importDefault(require("./Routes/document.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
const groupUsers_routes_1 = __importDefault(require("./Routes/groupUsers.routes"));
const fileUpload = require('express-fileupload');
const initExpress = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(body_parser_1.default.urlencoded({ extended: true, limit: "20mb" }));
    app.use(body_parser_1.default.json({ limit: "5mb" }));
    app.use(fileUpload());
    app.use(user_routes_1.default); //LLamo a las rutas
    app.use(groupUsers_routes_1.default); //LLamo a las rutas
    app.use(document_routes_1.default); //LLamo a las rutas
    return app;
};
exports.initExpress = initExpress;
