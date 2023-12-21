import insertPhotoModel from "../../models/posts/insertPhotoModel.js";
import selectPostByIdModel from "../../models/posts/selectPostByIdModel.js";
import { photoLimitError } from "../../services/errorService.js";
import { savePhotoService } from "../../services/photoService.js";

const addPostPhotoController = async (req, res, next) => {
    try {
        const {post_id} = req.params;
        
        // Ver si el post tiene 8 fotos
        const post = await selectPostByIdModel(post_id);
        
        if(post.photos.length > 7) photoLimitError();
        const photoName = await savePhotoService(req.files.photo, 500);
        const photoId = await insertPhotoModel(photoName,post_id);

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

export default addPostPhotoController;