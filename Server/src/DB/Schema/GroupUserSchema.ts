import { Schema, model } from "mongoose";

const groupUsersSchema = new Schema(
    {
        nameGroupUsers: {
            type: String,
            required: true
        },
        users: {
            type: Array,
            default: null
        }
    },{
        timestamps: true,
        versionKey: false
    }
)

const groupUsersInstanceDB = model('groupUsers', groupUsersSchema);
export default groupUsersInstanceDB;