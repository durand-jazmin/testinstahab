'use strict';

import insertReelModel from "../../models/reels/insertReelModel.js";
import insertPhotoModel from "../../models/reels/insertPhotoModel.js";
import { savePhotoService } from '../../services/photoService.js';

const newReelController = async (req,res,next) => {
    try {

        const {title, place, description} = req.body;

        const reelId = await insertReelModel(title,place,description,req.user.id);

        let photos=[];

        if(req.files){
            for(let photo of Object.values(req.files).slice(0,3)){
                
                let photoName = await savePhotoService(photo, 500);

                const photoId = await insertPhotoModel(photoName, reelId);

                photos.push({
                    id: photoId,
                    name: photoName
                })
            }
        }

        res.send({
            status: 'ok',
            data:{
                reel:{
                    id: reelId,
                    title,
                    place,
                    description,
                    userId: req.user.id,
                    photos,
                    createdAt: new Date()
                }
            }
        });

    } catch (error) {
        next(error);
    }
}

export default newReelController;


/**Se encarga de la creación de nuevo reel */