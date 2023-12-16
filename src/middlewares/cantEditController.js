'use strict';

import selectReelByIdModel from "../models/reels/selectReelByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req,res,next) => {
    try {
        
        const { reelId } = req.params;

        const reel = await selectReelByIdModel(reelId);

        //si no somos propietarios no podemos editar nada
        if(reel.userId !== req.user.id) unauthorizedUserError();

        next();
    } catch (error) {
        next(error);
    }
}

export default cantEditController;