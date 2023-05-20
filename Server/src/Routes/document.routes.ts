import { Router } from "express";
import {
    createDocumentController,
    getAllDocumentController,
    getDocumentController,
    logicDeleteDocumentController,
    updateDocumentController,
} from "../Controller/Document.controller";

const documentRouter = Router();

documentRouter.post("/V1/document/createDocument", createDocumentController);
documentRouter.put("/V1/document/updateDocument", updateDocumentController);
documentRouter.delete("/V1/document/deleteDocument", logicDeleteDocumentController);
documentRouter.post("/V1/document/getDocument", getDocumentController);
documentRouter.post("/V1/document/getAllDocuments", getAllDocumentController);

export default documentRouter;
