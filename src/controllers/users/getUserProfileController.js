'use strict';

import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const getUserProfileController = async (req,res,next) => {
    try {
        
        const {userId} = req.params;

        const user = await selectUserByIdModel(userId);

        delete user.email;

        res.send({
            status: 'ok',
            data:{
                user // Envia la información del usuario en la respuesta.
            }
        });

    } catch (error) {
        next(error);  // Maneja cualquier error y lo pasa al siguiente middleware.
    }
}


export default getUserProfileController;

/* recibe un ID de usuario como parte de la solicitud. Luego, usa ese 
ID para obtener la información del usuario correspondiente desde el
 modelo. Posteriormente, elimina el campo de correo electrónico del 
 objeto del usuario para no mostrarlo públicamente y finalmente envía
  la información del usuario en la respuesta. Si hay algún error 
  durante este proceso, será manejado y enviado al siguiente 
  middleware para su gestión.*/