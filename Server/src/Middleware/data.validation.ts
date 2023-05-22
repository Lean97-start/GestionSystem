import { NextFunction, Response } from "express";
import { RequestModified } from "../Interface/User.interface";
const typeDoc = ['privado','publico','borrador']
import { errorClient } from "../Util/Response/User/error";


export function validateDataFile(req: RequestModified, res: Response, next: NextFunction) {
    try {        
        if(!req.body) return res.status(400).json("Cuerpo de la petición requerido");
        // const regex = /^[a-zA-Z0-9!@#$%^&*()-_=+\[\]{};:'",.<>/?`~\\|]+$/;
    
         //Valido que el file no venga vacío.
        if(!req.files){
            return res.status(errorClient.ERROR_DOCUMENT_NULL.statusCode).json(errorClient.ERROR_DOCUMENT_NULL.error_message);
        }
        
        let file = req.files.dataDocument;

        const ext = "." + file.name.split(".").slice(-1);
        const posExt = file.name.indexOf(ext);
        const cadFinal = file.name.slice(0, posExt);
        
        //Valido el nombre del file.
        if(cadFinal == null == undefined || cadFinal.length < 3 || cadFinal.length > 50 ){
            return res.status(errorClient.ERROR_NAMEDOC.statusCode).json(errorClient.ERROR_NAMEDOC.error_message);
        
        //Valido el tipo de dato (publico, privado, borrador).
        } else if(!typeDoc.includes(req.body.typeDocument)){
            return res.status(errorClient.ERROR_TYPE_DOCUMENT.statusCode).json(errorClient.ERROR_TYPE_DOCUMENT.error_message);
        
        //Valido el id del propietario.       
        } else if(req.body.documentOwner.length !== 24){
            return res.status(errorClient.ERROR_DOCUMENT_OWNER.statusCode).json(errorClient.ERROR_DOCUMENT_OWNER.error_message);
        }
        console.log(req.body.documentOwner)

        req.body.dataDocument = file.data;
        req.body.nameDocument = file.name;
        next();
    } catch (error: any) {
        return res.status(500).json(error);
    }
}