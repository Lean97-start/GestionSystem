import { createDocumentDB, logicDeleteDocumentDB, updateDocumentDB } from "../DB/Query/Document/ABMDocument";
import { downloadFileDB, searchAllDocumentsDB, searchDocumentDB } from "../DB/Query/Document/SearchDocument";
import { searchUserDB } from "../DB/Query/User/SearchUser";
import { IDocument, IFilterDocument, ISuccess } from "../Interface/Document.interface";
import { IError } from "../Interface/error.Interface";

export const createDocumentModel = async (document: IDocument): Promise<IDocument | IError> => {
    try {
        await searchUserDB(document.documentOwner)
        let responseCreate:any = await createDocumentDB(document)
        responseCreate = {
            nameDocument: responseCreate.nameDocument           
        }
        return responseCreate;
    } catch (error: any) {
        return error;
    }
}

export const downloadFileModel = async (_id_file: string): Promise<any> => {
    try {
        const fileFound = await downloadFileDB(_id_file);
        const nameFile = fileFound.nameDocument; 
        const cabecera = {
            'Content-Disposition': `attachment; filename='${fileFound.nameDocument}'`,
        }
        return {file: fileFound.dataDocument, cabecera, nameFile};
    } catch (error: any) {
        return error
    }
}

export const updateDocumentModel = async (_id_doc:string, updatedDocument: IDocument): Promise<IDocument | IError> => {
    try {
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



