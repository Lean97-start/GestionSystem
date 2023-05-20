import {connect} from 'mongoose';
import { IConfig } from '../../Interface/Config';

export let instanceDB: any;

export async function connectDBMongo(env: IConfig){

    try {
        console.log('Trying connect with mongoDB');
        let connectionMongo = await connect(env.mongoDB);

        if(!connectionMongo){
            console.log("Failed connection with mongoDB, trying again in 5 seconds");
            setTimeout(() => connectDBMongo(env), 5000);
        }
        console.log("Database connection created");

    } catch (error: any) {
        console.log("Failed connection with mongoDB, trying again in 5 seconds");
        setTimeout(() => connectDBMongo(env), 5000);
    }
}