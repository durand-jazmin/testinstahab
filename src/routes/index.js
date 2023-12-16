'use strict';

import express from 'express';
import reelsRouter from './reelsRouter.js';
import userRouter from './userRouter.js';

const router = express.Router();

router.use(reelVideoRouter);
router.use(reelsRouter);
router.use(userRouter);

export default router;

