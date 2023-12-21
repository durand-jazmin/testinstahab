import getPool from "../../db/getPool.js";

const selectUserByIdModel = async (user_id) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id, username, email, createdAt
            FROM users
            WHERE id = ?
        `,
        [user_id]
    );

    return user[0];
};

export default selectUserByIdModel;