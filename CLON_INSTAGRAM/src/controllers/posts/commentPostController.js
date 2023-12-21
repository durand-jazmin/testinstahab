import { commentNotFoundError, unauthorizedCommentDeletionError } from '../../services/errorService.js';
import insertCommentModel from '../../models/posts/insertCommentModel.js';

const commentPostController = {};

// Para añadir comentario
commentPostController.addComment = async (req, res) => {
    const { post_id, text } = req.body;
    const userId = req.user.id;

    try{
        const newComment = new insertCommentModel({ user_id, post_id, text });
        await newComment.save();

        res.status(201).json({ message: 'Comentario agregado correctamente.'});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al agregar el comentario.' });
    }
};

// Para borrar comentario
commentPostController.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const comment = await insertCommentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comentario no encontrado.' });
        }

        if (comment.userId.toString() !== user_id) {
            return res.status(403).json({ error: 'No tienes permisos para eliminar este comentario.' });
        }

        await comment.remove();
        res.status(200).json({ message: 'Comentario eliminado correctamente.'});
    } catch (error) {

        // Verificar tipo de error y manejarlo adecuadamente
        if (error.message === 'Comment not found') {
            res.status(404).json({ error: 'Comentario no encontrado.' });
        } else if (error.message === 'Unauthorized comment deletion') {
            res.status(403).json({ error: 'No tienes permisos para eliminar este comentario.' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al eliminar el comentario.' });
        }
    }
};

export default commentPostController;