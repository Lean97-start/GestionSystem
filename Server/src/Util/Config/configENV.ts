'use strict';

import 'dotenv/config'
import { IConfig } from '../../Interface/Config';

let env = process.env;
let config: IConfig; //Declarar con la intergaz config

export function enviroments():IConfig {
    return config = {
        port: env.PORT || "3320",
        mongoDB: env.MONGODB || "mongodb://localhost/crowdar",
    }   
}
