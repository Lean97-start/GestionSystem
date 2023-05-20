import { Request, Response } from "express"
import { IDocument } from "../Interface/Document.interface";
import { createDocumentModel, getDocumentModel, getDocumentsModel, logicDeleteDocumentModel, updateDocumentModel } from "../Model/Document.model";
import { validateErrorResponse } from "../Util/validations/errorResponseValidation";
import { success } from "../Util/Response/Document/success";

export const createDocumentController = async (req: Request, res: Response) => {
    try {
        const document: IDocument = req.body;
        const docCreated = await createDocumentModel(document);
        validateErrorResponse(docCreated); //Valido si hubo un error en la creación.
        return res
            .status(success.CREATED_DOCUMENT.statusCode)
            .json({
                message: success.CREATED_DOCUMENT.message,
                documentCreated: docCreated
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const updateDocumentController = async (req: Request, res: Response) => {
    try {
        const {_id, payload} = req.body;
        const updatedDoc = await updateDocumentModel(_id, payload);
        validateErrorResponse(updatedDoc);
        return res
            .status(success.UPDATED_DOCUMENT.statusCode)
            .json({
                message: success.UPDATED_DOCUMENT.message,
                documentUpdated: updatedDoc
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }
}

export const logicDeleteDocumentController = async (req: Request, res: Response) => {
    try {
        const _id: string = req.body;
        const docDeleted = await logicDeleteDocumentModel(_id);
        validateErrorResponse(docDeleted);
        return res
            .status(success.DELETED_DOCUMENT.statusCode)
            .send(success.DELETED_DOCUMENT.message);
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }    
}

export const getAllDocumentController = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const docsFound = await getDocumentsModel(payload)
        validateErrorResponse(docsFound);
        return res
            .status(success.DOCUMENTS_FOUND.statusCode)
            .send({
                message: success.DOCUMENTS_FOUND.message,
                documents: docsFound
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }    
}

export const getDocumentController = async (req: Request, res: Response) => {
    try {
        const _id: string = req.body;
        const docFound = await getDocumentModel(_id);
        validateErrorResponse(docFound);
        return res
            .status(success.DOCUMENT_FOUND.statusCode)
            .send({
                message: success.DOCUMENT_FOUND.message,
                document: docFound
            });
    } catch (error: any) {
        return res
            .status(error.statusCode)
            .json(error.error_message);
    }    
}