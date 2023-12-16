'use strict';

import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";


const getOwnUserController = async (req,res,next) => {
    try {
        
        const user = await selectUserByIdModel(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user
            }
        });

    } catch (error) {
        next(error);
    }
}

export default getOwnUserController;

/*este controlador utiliza una función del modelo para seleccionar al 
usuario actual basado en su ID, probablemente obtenido de la solicitud
 (req.user.id). Luego, envía la información del usuario como respuesta 
 si todo va bien, o maneja cualquier error para que sea procesado por
  el siguiente middleware.*/