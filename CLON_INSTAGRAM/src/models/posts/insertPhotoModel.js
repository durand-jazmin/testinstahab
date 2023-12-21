import getPool from '../../db/getPool.js';

const insertPhotoModel = async (photoName, post_id) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO posts (name, post_id)
            VALUES (?, ?)
        `,
        [photoName, post_id]
    );

    const { insertId } = result;

    return insertId;
}

export default insertPhotoModel;