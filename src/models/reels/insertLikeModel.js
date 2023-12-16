import getPool from "../../database/getPool.js";
import { likeAlreadyExistsError } from "../../services/errorService.js";

const insertLikeModel = async (value, reelId, userId) => {
    const pool = await getPool();

    //comprobar que si ya existe un like previo por parte del usuario
    //para ese reel -->>> NO PUEDE

    const [likes] = await pool.query(
        `
            SELECT id FROM reellikes
            WHERE userId = ? AND reelId=?
        `,
        [userId, reelId]
    );

    if(likes.length) likeAlreadyExistsError();

    //insertamos el like en reellikes
    await pool.query(
        `
            INSERT INTO reellikes (value, reelId, userId)
            VALUES (?,?,?)
        `,
        [value, reelId, userId]
    );

    const [likesAvg] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM reellikes WHERE reelId = ${reelId}
        `
    );

    return Number(likesAvg[0].avg);
}

export default insertLikeModel;

/* este modelo verifica si un usuario ya ha dado like un reel específico;
 si ya lo ha hecho, se lanza un error. Si no, registra el nuevo like en la 
 tabla reellikes y calcula el promedio actualizado de los valores de likes
  para ese reel. El resultado final es el promedio de los valores de likes 
  actualizado. Si ocurre algún error durante este proceso, será manejado adecuadamente.*/