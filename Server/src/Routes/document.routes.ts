import { Router } from "express";
import {
    createDocumentController,
    downloadFileController,
    getAllDocumentController,
    getDocumentController,
    logicDeleteDocumentController,
    updateDocumentController,
} from "../Controller/Document.controller";
import { validateToken } from "../Middleware/user.validation";
import { validateDataFile } from "../Middleware/data.validation";

const documentRouter = Router();

documentRouter.post("/V1/document/createDocument", validateToken, validateDataFile, createDocumentController);
documentRouter.put("/V1/document/updateDocument", validateToken, validateDataFile, updateDocumentController);
documentRouter.delete("/V1/document/deleteDocument", validateToken, logicDeleteDocumentController);
documentRouter.get("/V1/document/getDocument/:id", validateToken, getDocumentController);
documentRouter.post("/V1/document/getAllDocuments", validateToken, getAllDocumentController);
documentRouter.post("/V1/document/downloadFile", validateToken, downloadFileController);

export default documentRouter;
