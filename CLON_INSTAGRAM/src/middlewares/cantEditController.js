import selectPostByIdModel from "../models/posts/selectPostByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
    try {
        
        const { post_id } = req.params;

        const post = await selectPostByIdModel(post_id);

        // Si no somos propietarios no podemos editar nada
        if (post.userId !== req.user.id) unauthorizedUserError();

        next();
    } catch (error) {
        next(error);
    }
};

export default cantEditController;