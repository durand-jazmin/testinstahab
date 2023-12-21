import express from 'express';

import postsRouter from './postsRouter.js';
import useRouter from './useRouter.js'

const router = express.Router();

router.use(postsRouter);
router.use(useRouter);

export default router;