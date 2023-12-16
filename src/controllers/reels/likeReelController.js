'use strict';

import selectReelByIdModel from "../../models/reels/selectReelByIdModel.js";
import { cannotLikeOwnLikeError } from "../../services/errorService.js";
import insertLikeModel from "../../models/reels/insertLikeModel.js";

const likeReelController = async (req,res,next) => {
    try {
        const { reelId } = req.params;
        const { value } = req.body;

        const reel = await selectReelByIdModel(reelId);

        //el dueño del reel no puede darse like a el mismo
        //cannotLikeOwnReelError
        if(reel.userId === req.user.id) cannotLikeOwnReelError();

        const likesAvg = await insertLikeModel(value, reelId, req.user.id);

        res.send({
            status: 'ok',
            data: likesAvg
        });

    } catch (error) {
        next(error);
    }
}

export default likeReelController;


/* este controlador espera un ID de reely un valor de like en la solicitud. 
Luego, verifica si el usuario está intentando dar like a su propio reel; si lo 
hace, lanza un error específico. Si no, procede a insertar el like en la base 
de datos y responde con los datos actualizados después del like. Si ocurre algún 
error durante este proceso, será manejado y pasado al siguiente middleware para su gestión.*/