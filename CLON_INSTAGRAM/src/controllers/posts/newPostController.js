import insertPostModel from "../../models/entries/insertPostModel.js";
import insertPhotoModel from "../../models/entries/insertPhotoModel.js";
import { savePhotoService } from '../../services/photoService.js';

const newPostController = async (req, res, next) => {
    try {
        
        const {text, photo} = req.body;

        const post_id = await insertPostModel (text,photo, req.user.id);

        let photos=[];

        if (req.files){
            for (let photo of Object.values(req.files).slice(0,3)){

                let photoName = await savePhotoService(photo, 500);

                const photoId = await insertPhotoModel(photoName, post_id);

                photos.push({
                    id: photoId,
                    name: photoName
                })
            }
        }

        res. send({
            status: 'ok',
            data:{
                entry:{
                    id: post_id, 
                   text,
                   photo,
                    user_id: req.user.id,
                    photos,
                    createdAt: new Date()
                }
            }
        });
    } catch (error) {
        next(error);
    }
}

export default newPostController;