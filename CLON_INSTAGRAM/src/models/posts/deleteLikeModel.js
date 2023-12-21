import getPool from "../../db/getPool.js";

const deleteLikeModel = async (post_id, user_id) => {
    const pool = await getPool();

    // Vertificar si el usuario ya le dio "Like"
    const [like] = await pool.query(
        `
            SELECT id FROM likes
            WHERE user_id = ? AND post_id = ?
        `,
        [user_id, post_id]
    );

    // Si existe el "Like", poder eliminarlo
    if (like.length) {
        await pool.query(
            `
                DELETE FROM likes
                WHERE user_id = ? AND post_id = ?
            `,
            [userId, postId]
        );
    }

    // Obtener el promedio de los "Likes" restantes
    const [likesAvg] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM likes WHERE post_id = ${post_id}
        `
    );

    return Number(likesAvg[0].avg);
};

export default deleteLikeModel;