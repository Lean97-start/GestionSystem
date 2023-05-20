import { IDocument, IFilterDocument } from "../../../Interface/Document.interface";
import { IError } from "../../../Interface/error.Interface";
import { errorDB } from "../../../Util/Response/Document/error";
import documentInstanceDB from "../../Schema/DocumentSchema";

export const searchDocumentDB = async (_id_doc: string): Promise<IDocument | IError> => {
    try {
        const documentFound: IDocument | null = await documentInstanceDB.findOne({_id: {$eq: _id_doc}})
            .then((document) => { return document })
            .catch(() => { throw errorDB.ERROR_DOCUMENT_NOT_FOUND })   
        if(!documentFound) throw errorDB.ERROR_DOCUMENT_NOT_FOUND
        return documentFound;
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error;
        throw errorDB.ERROR_DOCUMENT_FOUND;
    }
}

export const searchAllDocumentsDB = async (payload: IFilterDocument) => {
    try {

        let parameterFilter = {};

        if(payload.nameDocument){
            const regexString = new RegExp(payload.nameDocument,"i")
            parameterFilter = {
                ...parameterFilter,
                nameDocument: {
                    $regex: regexString
                }
            }
        }

        if(payload.documentOwner){
            const regexString = new RegExp(payload.documentOwner,"i")
            parameterFilter = {
                ...parameterFilter,
                documentOwner: {
                    $regex: regexString
                }
            }
        }

        if(payload.createdAt){
            const date = payload.createdAt.toString().split('T')[0]
            parameterFilter = {
                ...parameterFilter,
                createdAt: {                   
                    $gte: `${date}T00:00:00.000Z`,
                    $lte: `${date}T23:59:59.999Z`                   
                }
            }
        }
        
        const documentsFound: Array<IDocument> = await documentInstanceDB.find(parameterFilter);     
        return documentsFound;
    } catch (error: any) {
        console.log(error)
        throw errorDB.ERROR_DOCUMENT_FOUND;
    }
}