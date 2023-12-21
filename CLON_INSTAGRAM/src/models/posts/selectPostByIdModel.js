import getPool from "../../db/getPool.js";

const selectPostByIdModel = async (post_id) => {

    const pool = await getPool();

    const [post] = await pool.query(
        `
            SELECT p.id, p.text, u.username, p.user_id, AVG(IFNULL(v.value,0)) AS likes, e.createdAt
            FROM posts p
            LEFT JOIN likes v ON v.post_id = p.id
            INNER JOIN users u On u.id = p.user_id
            WHERE p.id = ${post_id}
            GROUP BY p.id
            ORDER BY p.createdAt DESC
        `
    );

    const [photos] = await pool.query(
        `
            SELECT id, name FROM photos WHERE post_id = ?
        `
        [post_id]
    );

   post[0].photos = photos;

    return post[0];

}

export default selectPostByIdModel;