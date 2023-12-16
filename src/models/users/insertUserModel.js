'use strict';

import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';
import sendMailUtil from '../../util/sendMailUtil.js';

import {
    emailAlReadyRegistratedError,
    userAlReadyRegistratedError
} from '../../services/errorService.js';

const insertUserModel = async (username, email, password, registrationCode) => {
    const pool = await getPool();

    let [user] = await pool.query(
        `
            SELECT id FROM users WHERE username = ?
        `,
        [username]
    );

    if(user.length){
        userAlReadyRegistratedError();
    };

    [user] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if(user.length){
        emailAlReadyRegistratedError();
    };

    /**hacer logica de envio de email */
    const emailSubject = 'Activa tu usuario de InstaHAB App';

    const emailBody = `
            !!!Bienvenid@ ${username}¡¡¡¡¡

            Gracias por registrarse en InstaHAB App. Para activar tu cuenta haga click en el siguiente enlace:

            <a href="http://localhost:3000/users/validate/${registrationCode}">Activar mi cuenta</a>
    `

    await sendMailUtil(email,emailSubject,emailBody);

    const hashedPassword = await bcrypt.hash(password,10);

    await pool.query(
        `
            INSERT INTO users (username, email, password, registrationCode)
            VALUES (?,?,?,?)
        `,
        [username, email, hashedPassword, registrationCode]
    );
    
}

export default insertUserModel;
/**Este modelo se encarga de manejar la inserción de un nuevo usuario, asegurando 
 * que no haya duplicados en el nombre de usuario o correo electrónico y enviando 
 * un correo electrónico de activación después de almacenar la información en la base de datos. */