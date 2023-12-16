'use strict';

import selectAllReelsModel from "../../models/reels/selectAllReelsModel.js";

const listReelsController = async (req,res,next) => {
    try {
        
        const reels = await selectAllReelsModel();

        res.send({
            data: reels
        })
    } catch (error) {
        next(error);
    }
}

export default listReelsController;

/**llamar a esta función del modelo para obtener un conjunto de datos 
 * que representan todas los reel almacenados en la base de datos. 
 * Luego, envía esta información como respuesta a la solicitud, 
 * devolviendo un objeto JSON que contiene los datos de los reel */