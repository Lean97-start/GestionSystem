import { createDocumentDB, logicDeleteDocumentDB, updateDocumentDB } from "../DB/Query/Document/ABMDocument";
import { searchAllDocumentsDB, searchDocumentDB } from "../DB/Query/Document/SearchDocument";
import { IDocument, IFilterDocument, ISuccess } from "../Interface/Document.interface";
import { IError } from "../Interface/error.Interface";

export const createDocumentModel = async (document: IDocument): Promise<IDocument | IError> => {
    try {
        // validateDocument(document); //Realizo la validación de los datos. De haber error, lanza un throw
        const responseCreate:any = await createDocumentDB(document);
        return responseCreate;
    } catch (error: any) {
        return error;
    }
}

export const updateDocumentModel = async (_id_doc:string, updatedDocument: IDocument): Promise<IDocument | IError> => {
    try {
        // validateDocument(document);//Realizo la validación de los datos. De haber error, lanza un throw
        await searchDocumentDB(_id_doc);
        const responseUpdate: IDocument | IError = await updateDocumentDB(_id_doc, updatedDocument);
        return responseUpdate;
    } catch (error: any) {
        return error;
    }
}

export const logicDeleteDocumentModel = async (_id_doc: string): Promise<Boolean> => {
    try {
        // validateDocument(document);//Realizo la validación de los datos. De haber error, lanza un throw
        await searchDocumentDB(_id_doc);
        await logicDeleteDocumentDB(_id_doc);
        return true;
    } catch (error: any) {
        return error;
    }
}

export const getDocumentModel = async (_id_doc: string): Promise<IDocument | IError> => {
    try {
        const docFound: IDocument | IError = await searchDocumentDB(_id_doc);
        return docFound;
    } catch (error: any) {
        return error
    }
}

export const getDocumentsModel = async (payload: IFilterDocument): Promise<Array<IDocument> | IError> => {
    try {
        const docsFound = await searchAllDocumentsDB(payload); 
        return docsFound;
    } catch (error: any) {
        return error
    }
}