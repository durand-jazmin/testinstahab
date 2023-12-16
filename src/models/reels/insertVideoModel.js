'use strict';

import getPool from "../../database/getPool.js";

const insertVideoModel = async (videoName, reelId, durationInSeconds) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO reelvideos (name, reelId, duration)
            VALUES (?, ?, ?)
        `,
        [videoName, reelId, durationInSeconds]
    );

    const { insertId } = result;

    return insertId;
}

export default insertVideoModel;
