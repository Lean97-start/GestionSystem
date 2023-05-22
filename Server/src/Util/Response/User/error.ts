export const errorDB = {
    ERROR_USER_NOT_FOUND: {statusCode: 404 ,error_message:"Usuario no encontrado."},
    ERROR_USER_FOUND: {statusCode: 500 ,error_message:"Hubo un error en buscar el usuario."},
    ERROR_USERS_FOUND: {statusCode: 500 ,error_message:"Hubo un error en buscar los usuarios."},
    ERROR_CREATE_USER: {statusCode: 500 ,error_message:"Hubo un error en la creación del usuario."},
    ERROR_UPDATE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en actualizar el documento."},
    ERROR_DELETE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en eliminar el documento."},
    ERROR_LOGIN_USER: {statusCode: 500 ,error_message:"Hubo un error en iniciar sesión."},
    ERROR_LOGOUT_USER: {statusCode: 500 ,error_message:"Hubo un error en cerrar sesión."},  
    ERROR_VALIDATE_USER: {statusCode: 500, error_message: 'Ocurrio un error al validar el usuario.'},
    ERROR_ASSIGN_TOKEN_USER: {statusCode: 500, error_message: 'Ocurrio un error al asignar el token.'},
}

export const errorClient = {
    ERROR_USERNAME_INVALID: {statusCode: 401 ,error_message:"Nombre de usuario inválido."},  
    ERROR_PASSWORD_INVALID: {statusCode: 401 ,error_message:"Contraseña incorrecta."},  
    ERROR_SESSION_ACTIVE: {statusCode: 400 ,error_message:"Ya tiene una sesión activa."},  
    ERROR_USER_NOT_HAVE_SESSION_ACTIVE: {statusCode: 400 ,error_message: 'No tiene una sesión activa.' },
    ERROR_USER_REGISTED: {statusCode: 400 ,error_message: 'Usuario ya registrado.' },
    ERROR_NAMEDOC: {statusCode: 400 ,error_message: 'Nombre del documento incorrecto.' },
    ERROR_TYPE_DOCUMENT: {statusCode: 400 ,error_message: 'Tipo incorrecto de documento' },
    ERROR_DOCUMENT_OWNER: {statusCode: 400 ,error_message: 'Propietario incorrecto' },
    ERROR_DOCUMENT_NULL: {statusCode: 400 ,error_message: 'El documento es requerido' }
}