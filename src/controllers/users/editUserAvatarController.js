'use strict';

import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import updateUserAvatarModel from "../../models/users/updateUserAvatarModel.js";

import {deletePhotoService, savePhotoService} from '../../services/photoService.js';

const editUserAvatarController = async (req,res,next) => {
    try {
        //console.log(req.files.avatar);

        const user = await selectUserByIdModel(req.user.id);

        if(user.avatar) await deletePhotoService(user.avatar);

        const avatarName = await savePhotoService(req.files.avatar, 100);

        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado'
        });

    } catch (error) {
        next(error);
    }
}

export default editUserAvatarController;

/* este controlador recibe una solicitud para actualizar el avatar de 
un usuario. Primero, obtiene la información del usuario actual 
mediante su ID, luego elimina el avatar anterior (si existe),
 guarda el nuevo avatar, actualiza esta información en el modelo 
 y envía una respuesta indicando que el avatar ha sido actualizado
  correctamente, o maneja cualquier error que ocurra durante este proceso.*/