'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviroments = void 0;
require("dotenv/config");
let env = process.env;
let config; //Declarar con la intergaz config
function enviroments() {
    return config = {
        port: env.PORT || "3320",
        mongoDB: env.MONGODB || "mongodb://localhost/crowdar",
        jwt_secret: env.JWT_SECRET || "secretDefault"
    };
}
exports.enviroments = enviroments;
