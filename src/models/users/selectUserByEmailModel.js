'use strict';

import getPool from '../../database/getPool.js';

const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id, password, role, recoverPassCode, active
            FROM users
            WHERE email = ?
        `,
        [email]
    );
    

    return user[0];
}

export default selectUserByEmailModel;
/**Este modelo utiliza la dirección de correo electrónico 
 * proporcionada para realizar una consulta SQL a la base 
 * de datos. Selecciona información específica del usuario 
 * correspondiente al correo electrónico y retorna el primer
 *  usuario encontrado que coincida con ese correo electrónico. */