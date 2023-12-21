import selectPostByIdModel from "../../models/posts/selectPostByIdModel.js";

const getPostController = async (req, res, next) => {
    try {
        const {post_id} = req.params;

        const post = await selectPostByIdModel(post_id);

        res.send({
            status: 'ok',
            data: post
        });
    
    } catch (error) {
        next(error);
    }
}

export default getPostController;