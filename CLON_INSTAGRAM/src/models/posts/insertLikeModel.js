import getPool from "../../db/getPool.js";
import { likeAlreadyExistsError } from "../../services/errorService.js";

const insertLikeModel = async (value, post_id, user_id) => {
    const pool = await getPool();


    // Comprobar que si existe un like previo por parte del usuario para ese post, no puede darle de nuevo

    const [likes] = await pool.query(
    `
        SELECT id FROM likes
        WHERE user_id = ? AND post_id = ?
    `,
    [user_id, post_id]
    );

    if (likes.length) likeAlreadyExistsError();

    // Insertamos el like en likes
    await pool.query(
    `
        INSERT INTO likes (value, post_id, user_id)
        VALUES (?, ?, ?)
    `,
    [value, post_id, user_id]
    );

    const [likesAvg] = await pool.query(
    `
        SELECT AVG(value) AS avg FROM likes WHERE post_id = ${post_id}
    `
    );

    return Number(likesAvg[0].avg);
}

export default insertLikeModel;