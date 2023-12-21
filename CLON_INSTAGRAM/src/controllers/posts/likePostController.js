import { likeAlreadyExistsError } from '../../services/errorService.js';
import insertLikeModel from '../../models/posts/insertLikeModel.js';
import deleteLikeModel from '../../models/posts/deleteLikeModel.js';

const likePostController = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const user_id = req.user.id;

        // Verificar si el usuario ya le dio "Like"
        const alreadyLiked = await insertLikeModel.checkIfLiked(post_id, user_id);

        if (alreadyLiked) {
        
            // Si ya le dio "Like", poder eliminarlo
            const likesAvg = await deleteLikeModel.deleteLike(post_id, user_id);

            res.status(200).json({
                status: 'ok',
                message: 'Me gusta eliminado.',
                data: likesAvg
            });
        } else {

            // Si no le "Like" previamente, permitir darlo
            const likesAvg = await insertLikeModel.likePost(post_id, user_id);

            res.status(200).json({
                status: 'ok',
                data: likesAvg
            });
        }
    } catch (error) {

        // Verificar tipo de error y manejarlo adecuadamente
        if(error.message === 'Like already exists') {
            // Si ya le dio "Like", lanzar el error
            likeAlreadyExistsError();
        } else {
            next(error);
        }
    }
};

export default likePostController;