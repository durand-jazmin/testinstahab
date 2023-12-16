import getPool from "../../database/getPool.js";

const insertPhotoModel = async (photoName, reelId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO reelphotos (name, reelId)
            VALUES (?,?)
        `,
        [photoName, reelId]
    );

    const { insertId } = result;

    return insertId;
}

export default insertPhotoModel;