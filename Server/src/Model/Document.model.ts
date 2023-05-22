import { createDocumentDB, logicDeleteDocumentDB, updateDocumentDB } from "../DB/Query/Document/ABMDocument";
import { downloadFileDB, searchDocumentDB } from "../DB/Query/Document/SearchDocument";
import { getGroupDB } from "../DB/Query/User/GroupUsers";
import { searchUserDB, validateUsersExistCreateDB } from "../DB/Query/User/SearchUser";
import { IDocument } from "../Interface/Document.interface";
import { IError } from "../Interface/error.Interface";
import { formatResponse } from "../Util/Format/document.format";
import { errorClient } from "../Util/Response/Document/error";
import { errorGroupUsersClient } from "../Util/Response/Group/error";
import { getDocumentModel } from "./GetDocuments.model";

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

export const updateDocumentModel = async (body: any): Promise<IDocument | IError> => {
    try {       
        await searchDocumentDB(body._id);
        const responseUpdate: IDocument | IError = await updateDocumentDB(body._id, body);
        return formatResponse(responseUpdate);
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

export const updateUsersToDocumentModel = async (body: any): Promise<any> => {
    try {
        if(!body._id_doc) throw errorClient.ERROR_ID_DOCUMENT;
        if(!body.users) throw errorGroupUsersClient.ERROR_GROUP_USERS_REQUIRED;
        const { _id_doc, users } = body;

        const usersInDoc: any = await getDocumentModel(_id_doc)
        let arrayOfexistingUsers = usersInDoc.usersGroup; //Array para guardar los datos y luego concatenarlos.
        let newUsers: Array<string> = [] //Array para los usuarios que no estan repetidos.
        let oldUsers: Array<any> = [] //Array para los usuarios que no estan repetidos.
        let existingUsers: Array<string> = [] // Array de usuarios ya existentes en el documento.
        let arrayExistUsersFiltered: Array<any> = [] 
        arrayOfexistingUsers.forEach((existingUser: any) => {existingUsers.push(existingUser._id.toString())});
        
        users.forEach((userID: string) => {
            if(!existingUsers.includes(userID)){
                newUsers.push(userID);
            }else{
                oldUsers.push(userID);
            }
        });

        let usersFound: any;

        arrayOfexistingUsers.forEach((existingUser: any) => {
            if(oldUsers.includes(existingUser._id.toString())){
                arrayExistUsersFiltered.push(existingUser);
            }
        });
        if(newUsers.length > 0){
            usersFound = await validateUsersExistCreateDB(newUsers);
            console.log("HOLA",usersFound)
            const arrayConcat: Array<Object> = arrayExistUsersFiltered.concat(usersFound);
            const docUpdated: any = await updateDocumentDB(_id_doc, {usersGroup: arrayConcat});
            if(docUpdated.typeDocument){
                return formatResponse(docUpdated)
            }else{
                return true;
            }
        }else{
            const arrayConcat: Array<Object> = arrayExistUsersFiltered
            const docUpdated: any = await updateDocumentDB(_id_doc, {usersGroup: arrayConcat});
            if(docUpdated.typeDocument){
                return formatResponse(docUpdated)
            }else{
                return true;
            }
        }
        
    } catch (error: any) {
        return error;
    }
}

export const assignGroupUsersToDocumentModel = async (body: any): Promise<any> => {
    try {
        if(!body._id_doc) throw errorClient.ERROR_ID_DOCUMENT;
        if(!body._id_group) throw errorGroupUsersClient.ERROR_ID_GROUP_USERS;
        const { _id_doc, _id_group } = body;
        await searchDocumentDB(_id_doc);
        const groupUsers: any= await getGroupDB(_id_group);
        const payload = {usersGroup: groupUsers.users}
        const docUpdated: any = await updateDocumentDB(_id_doc, payload);
        if(docUpdated.typeDocument){
            return formatResponse(docUpdated)
        }else{
            return docUpdated;
        }
    } catch (error: any) {
        return error;
    }
}