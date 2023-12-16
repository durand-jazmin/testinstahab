'use strict';

import randomstring from 'randomstring';

import insertUserModel from '../../models/users/insertUserModel.js';

const newUserController = async (req,res,next) => {
    try {

        const { username, email, password } = req.body;
        
        const registrationCode = randomstring.generate(30);

        await insertUserModel(username, email, password, registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario registrado. Verifique su cuenta mediante el email recibido'
        });
        
    } catch (error) {
        next(error);
    }
}

export default newUserController;

/*este controlador maneja la lógica para registrar un nuevo usuario en la base de datos.
 Extrae la información del formulario, genera un código único para el registro, inserta
  el usuario utilizando la función insertUserModel y luego envía una respuesta al 
  cliente confirmando el éxito del registro. Si ocurre algún error durante este proceso, 
  pasa el control al siguiente middleware de manejo de errores (next(error)).*/