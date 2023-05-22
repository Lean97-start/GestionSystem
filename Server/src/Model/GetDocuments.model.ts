import { searchAllDocumentsDB, searchDocumentDB } from "../DB/Query/Document/SearchDocument";
import { IDocument, IFilterDocument } from "../Interface/Document.interface";
import { IError } from "../Interface/error.Interface";
import { formatResponses } from "../Util/Format/document.format";



export const getDocumentModel = async (_id_doc: string): Promise<IDocument | IError> => {
    try {
        const docFound: IDocument | IError = await searchDocumentDB(_id_doc);
        return formatResponses(docFound);
    } catch (error: any) {
        return error
    }
}

export const getDocumentsModel = async (_id_user: string, payload: IFilterDocument): Promise<Array<IDocument> | IError> => {
    try {
        const docsFound = await searchAllDocumentsDB(payload); 
        let arrayPublicDoc: any = [];
        let arrayDraftDoc: any = [];
        let arrayPrivateDoc: any = [];
        docsFound.forEach((doc: any) => {
            console.log(doc.documentOwner.toString(), _id_user)
            if(doc.typeDocument == "privado"){
                if(doc.documentOwner.toString() == _id_user){
                    arrayPrivateDoc.push(doc);
                }
            } else if(doc.typeDocument == "borrador"){
                if(doc.documentOwner.toString() == _id_user){
                    arrayDraftDoc.push(doc);
                }
            }else if(doc.typeDocument == "publico"){
                arrayPublicDoc.push(doc);
            }
        })
        const arrayConcat = arrayPrivateDoc.concat(arrayDraftDoc.concat(arrayPublicDoc))
        return formatResponses(arrayConcat);
    } catch (error: any) {
        return error
    }
}
