'use strict';

import getPool from '../../database/getPool.js';

const insertReelModel = async (title, place, description, userId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO reels (title, place, description, userId)
            VALUES (?,?,?,?)
        `,
        [title, place, description, userId]
    );
    
    console.log(result);
    
    const { insertId } = result;
    
    return insertId;
}

export default insertReelModel;