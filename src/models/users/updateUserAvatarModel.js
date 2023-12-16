'use strict';

import getPool from "../../database/getPool.js"

const updateUserAvatarModel = async (avatarName, userId) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET avatar = ?
            WHERE id = ?
        `,
        [avatarName,userId]
    );
}

export default updateUserAvatarModel;

/*Este modelo permite actualizar el campo de avatar en 
la tabla de usuarios en la base de datos. Toma el nombre 
del avatar y el ID del usuario y ejecuta una consulta SQL 
para actualizar el campo de avatar del usuario con el nuevo
 nombre del avatar proporcionado.*/