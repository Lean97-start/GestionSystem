import { searchAllDocumentsDB, searchDocumentDB } from "../DB/Query/Document/SearchDocument";
import { IDocument, IFilterDocument } from "../Interface/Document.interface";
import { IError } from "../Interface/error.Interface";



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
