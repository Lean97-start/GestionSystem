
export const errorDB = {
    ERROR_DOCUMENT_NOT_FOUND: {statusCode: 404 ,error_message:"Documento no encontrado."},
    ERROR_DOCUMENT_FOUND: {statusCode: 500 ,error_message:"Hubo un error en buscar el documento."},
    ERROR_CREATE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en la creación del documento."},
    ERROR_UPDATE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en actualizar el documento."},
    ERROR_DELETE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en eliminar el documento."},
}

export const errorClient = {
    ERROR_USER_NOT_FOUND: {statusCode: 400 ,error_message:"El ID del usuario está erróneo, corrobore"},
    ERROR_ID_DOCUMENT: {statusCode: 500 ,error_message:"El ID del documento es requerido."},
}