import getPool from "../../db/getPool.js";

const insertCommentModel = async (user_id, post_id, text) => {
    const pool = await getPool();

    try {
        
        // Insertar el comentario en la tabla 'comments' sin verificar existencia previa
        await pool.execute(
            `
                INSERT INTO comments (user_id, post_id, text) VALUES (?, ?, ?)
            `,
            [user_id, post_id, text]
        );

        return true;
    } catch (error) {
        throw error;
    } finally {
        await pool.release();
    }
};

export default insertCommentModel;