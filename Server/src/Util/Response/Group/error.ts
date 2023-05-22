export const errorGroupUsersDB = {
    ERROR_CREATE_GROUP: {statusCode: 500, error_message: 'Ocurrio un error al crear un grupo de usuarios.'},
    ERROR_GET_GROUP: {statusCode: 500, error_message: 'Ocurrio un error al buscar un grupo de usuarios.'},
    ERROR_UPDATE_GROUP: {statusCode: 500, error_message: 'Ocurrio un error al actualizar el grupo de usuarios.'},
    ERROR_DELETE_GROUP: {statusCode: 500, error_message: 'Ocurrio un error al eliminar el grupo de usuarios.'},
    ERROR_VALIDATE_GROUP: {statusCode: 500, error_message: 'Ocurrio un error al validar el nombre del grupo de usuarios.'},
}

export const errorGroupUsersClient = {    
    ERROR_GROUP_USERS: {statusCode: 404 ,error_message: 'El grupo de usuarios no se encontró.' },
    ERROR_GROUP_USERS_REGISTED: {statusCode: 400 ,error_message: 'Ya existe un grupo de usuarios con ese nombre.' },
    ERROR_ID_GROUP_USERS: {statusCode: 400 ,error_message: 'El ID del grupo de usuarios es requerido.' },
    ERROR_GROUP_USERS_REQUIRED: {statusCode: 400 ,error_message: 'El grupo de usuarios es requerido.' },
    ERROR_GROUP_USERS_NAME_REQUIRED: {statusCode: 400 ,error_message: 'El nombre del grupo de usuarios es requerido.' },
}