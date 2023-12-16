'use strict';

import express from 'express';

const router = express.Router();

import { 
    newUserController,
    loginUserController,
    validateUserController,
    getUserProfileController,
    getOwnUserController,
    editUserAvatarController
} from '../controllers/users/index.js';

import authUserController from '../middlewares/authUserController.js';
import userExistsController from '../middlewares/userExistsController.js';

router.post('/users/register', newUserController);
router.get('/users/validate/:registrationCode', validateUserController)

router.post('/users/login', loginUserController);

//obtener el perfil publico del usuario
router.get('/users/:userId',userExistsController, getUserProfileController);

//obtener el perfil privado del usuario
router.get('/users',authUserController, getOwnUserController);

router.put('/users/avatar',authUserController, userExistsController, editUserAvatarController);

export default router;