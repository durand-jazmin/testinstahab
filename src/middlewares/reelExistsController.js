'use strict';

import getPool from "../database/getPool.js";
import { notFoundError } from "../services/errorService.js";

const reelExistsController = async (req,res,next) => {

    try {
        const pool = await getPool();

        const {reelId} = req.params;

        const [reel] = await pool.query(
            `
                SELECT id FROM reels WHERE id = ${reelId}
            `
        );

        if(reel.length < 1) notFoundError('reel');

        next();
    } catch (error) {
        next(error)
    }
}

export default reelExistsController;