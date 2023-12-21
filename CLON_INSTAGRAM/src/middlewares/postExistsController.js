import getPool from "../db/getPool.js";
import { notFoundError } from "../services/errorService.js";

const postExistsController = async (req, res, next) => {

    try{
        const pool = await getPool();
        
        const {post_id} = req.params;

        const [post] = await pool.query(
            `
                SELECT id FROM posts WHERE id = ${post_id}
            `
        );

        if(entry.length < 1) notFoundError('post');

        next();
    } catch (error) {
        next(error);
    }
};

export default postExistsController;