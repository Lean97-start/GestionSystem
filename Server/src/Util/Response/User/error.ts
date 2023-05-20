export const errorDB = {
    ERROR_USER_NOT_FOUND: {statusCode: 404 ,error_message:"Usuario no encontrado."},
    ERROR_USER_FOUND: {statusCode: 500 ,error_message:"Hubo un error en buscar el usuario."},
    ERROR_USERS_FOUND: {statusCode: 500 ,error_message:"Hubo un error en buscar los usuarios."},
    ERROR_CREATE_USER: {statusCode: 500 ,error_message:"Hubo un error en la creación del usuario."},
    ERROR_UPDATE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en actualizar el documento."},
    ERROR_DELETE_DOCUMENT: {statusCode: 500 ,error_message:"Hubo un error en eliminar el documento."},
    ERROR_LOGIN_USER: {statusCode: 500 ,error_message:"Hubo un error en iniciar sesión."},
    ERROR_LOGOUT_USER: {statusCode: 500 ,error_message:"Hubo un error en cerrar sesión."},  
}

export const errorClient = {
    ERROR_USERNAME_INVALID: {statusCode: 400 ,error_message:"Nombre de usuario inválido."},  

}