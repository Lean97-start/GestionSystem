import { IDocument } from "../../../Interface/Document.interface";
import { IError } from "../../../Interface/error.Interface";
import { errorDB } from "../../../Util/Response/Document/error";
import documentInstanceDB from "../../Schema/DocumentSchema";


export const createDocumentDB = async (documentPayload: IDocument): Promise<any> => {
    try {
        const documentCreated = await documentInstanceDB.create(documentPayload)
        return documentCreated;
    } catch (error) {
        console.log(error)
        throw errorDB.ERROR_CREATE_DOCUMENT;
    }
}

export const updateDocumentDB = async (_id_doc:string, updatedDocument: IDocument): Promise<IDocument | IError> => {
    try {
        const documentUpdated: IDocument | null = await documentInstanceDB.findOneAndUpdate(
            {
                _id: {$eq: _id_doc}
            }, 
                updatedDocument,
            {
                new: true
            }
        );
        if(!documentUpdated) throw errorDB.ERROR_DOCUMENT_NOT_FOUND;
        return documentUpdated;
    } catch (error: any) {
        if(error.statusCode.toString().startsWith('4')) throw error
        throw errorDB.ERROR_UPDATE_DOCUMENT 
    }
}

export const logicDeleteDocumentDB = async (_id_doc: string) => {
    try {
        const documentDeleted = await documentInstanceDB.findOneAndDelete({_id: {$eq: _id_doc}});
        return documentDeleted;
    } catch (error) {
        throw errorDB.ERROR_DELETE_DOCUMENT;
    }
}