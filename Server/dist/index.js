'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const configDB_1 = require("./Util/Config/configDB");
const configENV_1 = require("./Util/Config/configENV");
const express_1 = require("./express");
const env = (0, configENV_1.enviroments)();
//Instanciamos la base de datos
(0, configDB_1.connectDBMongo)(env);
//Instancio el router
const app = (0, express_1.initExpress)();
//Levanto el server
app.listen(env.port, () => {
    console.log(`Listen on the port ${env.port}`);
});
