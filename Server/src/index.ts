'use strict';
import { connectDBMongo } from "./Util/Config/configDB";
import { enviroments } from "./Util/Config/configENV";
import { initExpress } from "./express";

const env = enviroments();

//Instanciamos la base de datos
connectDBMongo(env);

//Instancio el router
const app = initExpress();

//Levanto el server
app.listen(env.port, () => {
    console.log(`Listen on the port ${env.port}`)
})