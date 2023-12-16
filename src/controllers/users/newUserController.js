'use strict';

import randomstring from 'randomstring'; // Importa la librería para generar códigos aleatorios.

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

/* cuando se recibe una solicitud para registrar un nuevo usuario, este controlador 
extrae la información del usuario del cuerpo de la solicitud. Luego, genera un 
código aleatorio para la verificación de la cuenta, llama a la función del 
modelo para insertar el nuevo usuario en la base de datos y responde con un
 mensaje de éxito si todo ha ido bien. Si ocurre algún error durante este proceso,
  será manejado y enviado al siguiente middleware para su gestión. */