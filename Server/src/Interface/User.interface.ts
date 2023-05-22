import { Request } from "express";

export interface IUser {
    username: string,
    password: string,
    fullNameUser: string,
    _id?: any,
    stateSession?: boolean
}

export interface RequestModified extends Request{
    user?: any
    files?: any
    // document?: any
    // user?: IToken | string
}