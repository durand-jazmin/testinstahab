'use strict';

import updateUserRegCodeModel from "../../models/users/updateUserRegCodeModel.js";

const validateUserController = async (req,res,next) => {
    try {
        
        const {registrationCode} = req.params;

        await updateUserRegCodeModel(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado'
        });
        
    } catch (error) {
        next(error);
    }
}

export default validateUserController;
/*este controlador espera un código de registro como parte de la URL. 
Luego, utiliza la función del modelo updateUserRegCodeModel para activar 
la cuenta del usuario en la base de datos. Si todo se completa correctamente,
 responde con un mensaje indicando que el usuario ha sido activado. 
 Si surge algún error durante el proceso, este será manejado y enviado 
 al siguiente middleware para su gestión. */