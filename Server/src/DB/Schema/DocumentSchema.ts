import { Schema, model } from "mongoose";

const documentSchema = new Schema(
    {
        nameDocument: {
            type: String,
            required: true
        },
        descriptionDocument: {
            type: String,
            required: false,
            default: null
        },
        typeDocument: {
            type: String,
            required:true,
            enum: ['publico', "privado", "borrador"]
        },
        documentOwner:{
            type: String,
            required:true
        },
        usersGroup:{
            type: Array,
            of: Object,
            required:true,
            default: []
        },
        dataDocument:{
            type: Buffer,
            required:true
        }
    },{
        timestamps: true,
        versionKey: false
    }
)

const documentInstanceDB = model('document', documentSchema);
export default documentInstanceDB;