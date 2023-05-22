import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fullNameUser: {
            type: String,
            required:true,
        },
        rolUser:{
            type: String,
            required:false
        },
        descriptionUser:{
            type: String,
            required:false
        },
        stateSession:{
            type: Boolean,
            required:false,
            default: true
        },
        token: {
            type: String,
            default: null,
        },
    },{
        timestamps: true,
        versionKey: false
    }
)

const userInstanceDB = model('user', userSchema);
export default userInstanceDB;