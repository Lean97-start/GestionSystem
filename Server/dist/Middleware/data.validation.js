"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateDataFile = exports.validateDataFile = void 0;
const typeDoc = ['privado', 'publico', 'borrador'];
const error_1 = require("../Util/Response/User/error");
function validateDataFile(req, res, next) {
    try {
        if (!req.body)
            return res.status(400).json("Cuerpo de la petición requerido");
        //Valido que el file no venga vacío.
        if (!req.files) {
            return res.status(error_1.errorClient.ERROR_DOCUMENT_NULL.statusCode).json(error_1.errorClient.ERROR_DOCUMENT_NULL.error_message);
        }
        let file = req.files.dataDocument;
        const ext = "." + file.name.split(".").slice(-1);
        const posExt = file.name.indexOf(ext);
        const cadFinal = file.name.slice(0, posExt);
        //Valido el nombre del file.
        if (cadFinal == null == undefined || cadFinal.length < 3 || cadFinal.length > 50) {
            return res.status(error_1.errorClient.ERROR_NAMEDOC.statusCode).json(error_1.errorClient.ERROR_NAMEDOC.error_message);
            //Valido el tipo de dato (publico, privado, borrador).
        }
        else if (!typeDoc.includes(req.body.typeDocument)) {
            return res.status(error_1.errorClient.ERROR_TYPE_DOCUMENT.statusCode).json(error_1.errorClient.ERROR_TYPE_DOCUMENT.error_message);
            //Valido el id del propietario.       
        }
        else if (req.body.documentOwner.length !== 24) {
            return res.status(error_1.errorClient.ERROR_DOCUMENT_OWNER.statusCode).json(error_1.errorClient.ERROR_DOCUMENT_OWNER.error_message);
        }
        req.body.dataDocument = file.data;
        req.body.nameDocument = file.name;
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.validateDataFile = validateDataFile;
function validateUpdateDataFile(req, res, next) {
    try {
        if (!req.body)
            return res.status(400).json("Cuerpo de la petición requerido");
        //Valido el tipo de dato (publico, privado, borrador).        
        if ("typeDocument" in req.body) {
            if (!typeDoc.includes(req.body.typeDocument)) {
                return res.status(error_1.errorClient.ERROR_TYPE_DOCUMENT.statusCode).json(error_1.errorClient.ERROR_TYPE_DOCUMENT.error_message);
            }
        }
        //Valido el id del propietario.     
        if ("documentOwner" in req.body) {
            if (req.body.documentOwner.length !== 24) {
                return res.status(error_1.errorClient.ERROR_DOCUMENT_OWNER.statusCode).json(error_1.errorClient.ERROR_DOCUMENT_OWNER.error_message);
            }
        }
        if ("descriptionDocument" in req.body) {
            let desc = req.body.descriptionDocument;
            if (desc && desc.length < 3 || desc.length > 500) {
                return res.status(error_1.errorClient.ERROR_DESCRIPCIP_INVALID.statusCode).json(error_1.errorClient.ERROR_DESCRIPCIP_INVALID.error_message);
            }
        }
        //Valido que el file no venga vacío.
        if (req.files && "dataDocument" in req.files) {
            if (!req.files) {
                return res.status(error_1.errorClient.ERROR_DOCUMENT_NULL.statusCode).json(error_1.errorClient.ERROR_DOCUMENT_NULL.error_message);
            }
            let file = req.files.dataDocument;
            const ext = "." + file.name.split(".").slice(-1);
            const posExt = file.name.indexOf(ext);
            const cadFinal = file.name.slice(0, posExt);
            //Valido el nombre del file.
            if (cadFinal == null == undefined || cadFinal.length < 3 || cadFinal.length > 50) {
                return res.status(error_1.errorClient.ERROR_NAMEDOC.statusCode).json(error_1.errorClient.ERROR_NAMEDOC.error_message);
            }
            req.body.dataDocument = file.data;
            req.body.nameDocument = file.name;
        }
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.validateUpdateDataFile = validateUpdateDataFile;
