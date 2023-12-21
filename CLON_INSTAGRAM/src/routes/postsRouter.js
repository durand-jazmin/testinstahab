import express from 'express';

// Creación de un enrutador Express
const router = express.Router();

// Importacón de controladores y middlewares necesarios para manejar las solicitudes de ruta 
import authUserController from '../middlewares/authUserController.js';

import {
    postExistsController,
    userExistsController,
    cantEditController
} from '../middlewares/index.js';

import {
    newPostController,
    listPostsController,
    getPostController,
    likePostController, 
    addPostPhotoController,
    commentPostController
} from '../controllers/posts/index.js';

// Configuración de las rutas
router.post('/posts', authUserController, userExistsController, newPostController);

router.get('/posts', listPostsController);

router.get('/posts/:post_id', postExistsController, getPostController);

router.post('/posts/:post_id/likes',
            authUserController,
            userExistsController,
            postExistsController,
            likePostController  
);

router.post('/eposts/:post_id/photos',
            authUserController,
            userExistsController,
            postExistsController,
            cantEditController,
            addPostPhotoController
);

router.post('/posts/:post_id/comments',
            authUserController,
            userExistsController,
            postExistsController,
            commentPostController.addComment
);

router.delete('/posts/comments/:commentId',
            authUserController,
            userExistsController,
            postExistsController,
            commentPostController.deleteComment
)
export default router;
