import selectAllPostsModel from "../../models/posts/selectAllPostsModel.js";

const listPostsController = async (req, res, next) => {

    try {
        const posts = await selectAllPostsModel();

        res.send({
            data: posts
        })
    } catch (error) {
        next(error);
    }
}

export default listPostsController;