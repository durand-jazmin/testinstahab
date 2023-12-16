'use strict';
import insertPhotoModel from "../../models/reels/insertPhotoModel.js";
import selectReelByIdModel from "../../models/reels/selectReelByIdModel.js";
import { photoLimitError } from "../../services/errorService.js";
import { savePhotoService } from "../../services/photoService.js";

const addReelPhotoController = async (req, res, next) => {
    try {
        
        const {reelId} = req.params;

        //ver si el reel tiene 3 fotos
        const reel = await selectReelByIdModel(reelId);

        if(reel.photos.length > 2) photoLimitError();

        // console.log(req.files, 'files');
        const photoName = await savePhotoService(req.files.photo, 500);

        const photoId = await insertPhotoModel(photoName,reelId);

        res.send({
            status: 'ok',
            data:{
                photo:{
                    id: photoId,
                    name: photoName
                }
            }
        })
    } catch (error) {
        next(error);
    }
}

export default addReelPhotoController;

/** este controlador verifica primero si la cantidad de fotos asociadas
 *  a un reel no supera el límite permitido. Luego, guarda la nueva 
 * foto, registra su información en la base de datos y responde con los 
 * detalles de la foto añadida.





 */