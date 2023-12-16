'use strict';

export const notFoundError = (resourse) => {
    throw {
        httpStatus: 404,
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${ resourse }' no se encuentra`
    }
}

export const userAlReadyRegistratedError = () => {
    throw {
        httpStatus: 409,//conflicto
        code: 'USER_ALREADY_REGISTERED',
        message: `El nombre de usuario ya se encuentra registrado`
    }
}

export const emailAlReadyRegistratedError = () => {
    throw {
        httpStatus: 409,//conflicto
        code: 'EMAIL_ALREADY_REGISTERED',
        message: `El email ya se encuentra registrado`
    }
}

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401,//no autorizado
        code: 'INVALID_CREDENTIALS',
        message: `Credenciales inválidas`
    }
}

export const sendMailError = () => {
    throw {
        httpStatus: 500,//no autorizado
        code: 'SEND_MAIL_FAILED',
        message: `Error al enviar email`
    }
}

export const pendignActivationError = () => {
    throw {
        httpStatus: 403,
        code: 'PENDING_ACTIVATION',
        message: `Usuario pendiente de activación. Verifique su cuenta antes de continuar`
    }
}

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401,// autenticacion
        code: 'NOT_AUTHENTICATED',
        message: 'Se esperaba un token por el header "Authorization" '
    }
}

export const saveFileError = () => {
    throw {
        httpStatus: 500,
        code: 'FILE_SAVE_FAILED',
        message: 'Error al guardar la imagen'
    }
}

export const deleteFileError = () => {
    throw {
        httpStatus: 409,// conflict
        code: 'FILE_DELETED_FAILED',
        message: 'Error al eliminar la imagen'
    }
}

export const cannotLikeOwnError = () => {
    throw {
        httpStatus: 403,
        code: 'CANNOT_LIKE_OWN_ERROR',
        message: 'No puedes dar like tu propia entrada'
    }
}

export const likeAlreadyExistsError = () => {
    throw {
        httpStatus: 409,//conflicto
        code: 'LIKE_ALLREADY_ERROR',
        message: 'No se puede dar like más de una vez al post'
    }
}

export const unauthorizedUserError = () => {
    throw {
        httpStatus: 409,//conflicto
        code: 'UNAUTHORIZED',
        message: 'El usuario no está autorizado para realizar esta operación'
    }
}

export const photoLimitError = () => {
    throw {
        httpStatus: 409,//conflicto
        code: 'PHOTO_LIMIT_ERROR',
        message: 'Se alcanzó el limite de tres fotos en el post.'
    };
}

export const videoLimitError = () => {
        throw {
            httpStatus: 409,
            code: 'VIDEO_LIMIT_ERROR',
            message: 'Se alcanzó el límite de un video por publicación.'
        };
    };
    
