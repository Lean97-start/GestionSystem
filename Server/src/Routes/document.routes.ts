import { Router } from "express";
import {
    assignGroupUsersToDocumentController,
    createDocumentController,
    downloadFileController,
    getAllDocumentController,
    getDocumentController,
    logicDeleteDocumentController,
    updateDocumentController,
    updateUsersToDocumentController,
} from "../Controller/Document.controller";
import { validateToken } from "../Middleware/user.validation";
import { validateDataFile, validateUpdateDataFile } from "../Middleware/data.validation";

const documentRouter = Router();

documentRouter.post("/V1/document/createDocument", validateToken, validateDataFile, createDocumentController);
documentRouter.put("/V1/document/updateDocument", validateToken, validateUpdateDataFile, updateDocumentController);
documentRouter.delete("/V1/document/deleteDocument", validateToken, logicDeleteDocumentController);
documentRouter.get("/V1/document/getDocument/:id", validateToken, getDocumentController);
documentRouter.post("/V1/document/getAllDocuments", validateToken, getAllDocumentController);
documentRouter.post("/V1/document/downloadFile", validateToken, downloadFileController);
documentRouter.post("/V1/document/addGroupToDocument", validateToken, downloadFileController);
documentRouter.post("/V1/document/assignGroupUsersToDocument", validateToken, assignGroupUsersToDocumentController);
documentRouter.post("/V1/document/updateUsersToDocument", validateToken, updateUsersToDocumentController);

export default documentRouter;
