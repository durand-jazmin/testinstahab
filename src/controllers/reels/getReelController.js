'use strict';

import selectReelByIdModel from "../../models/reels/selectReelByIdModel.js";

const getReelController = async (req,res,next) => {
    try {
        const {reelId} = req.params;

        const reel = await selectReelByIdModel(reelId);

        res.send({
            status: 'ok',
            data: reel
        });

    } catch (error) {
        next(error);
    }
}

export default getReelController;


/**este controlador sirve para obtener los detalles de un reel específico en 
 * la base de datos y responder con esa información en caso de encontrarla. */