'use strict';

import express from 'express';

const router = express.Router();

import  authUserController from '../middlewares/authUserController.js' 

import {
    reelExistsController,
    userExistsController,
    cantEditController
} from '../middlewares/index.js'

import {
    newReelController,
    listReelsController,
    getReelController,
    likeReelController,
    addReelPhotoController
} from '../controllers/reels/index.js';


router.post('/reels', authUserController, userExistsController, newReelController);
router.get('/reels', listReelsController);
router.get('/reels/:reelId', reelExistsController, getReelController);

router.post('/reels/:reelId/likes',
            authUserController,
            userExistsController,
            reelExistsController,
            likeReelController
);

router.post('/reels/:Id/photos',
            authUserController,
            userExistsController,
            reelExistsController,
            cantEditController,
            addReelPhotoController
);

export default router;