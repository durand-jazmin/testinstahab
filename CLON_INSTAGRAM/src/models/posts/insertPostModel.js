import getPool from '../../db/getPool.js';

const insertPostModel = async (text,photo, user_id) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO posts (text,photo, user_id)
            VALUE (?, ?, ?)
        `,
        [text,photo, user_id]
    );
    
    console.log(result);

    const { insertId } = result;

    return insertId;
}

export default insertEPostModel;