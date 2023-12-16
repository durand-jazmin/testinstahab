'use strict';

import insertVideoModel from "../../models/reels/insertVideoModel.js";
import selectReelByIdModel from "../../models/reels/selectReelByIdModel.js";
import { videoLimitError } from "../../services/errorService.js";
import { saveVideoService } from "../../services/videoService.js";

const addReelVideoController = async (req, res, next) => {
    try {
        const { reelId } = req.params;

        // Verificar si el reel tiene el límite de videos (1 video por reel)
        const reel = await selectReelByIdModel(reelId);

        if (reel.videos.length > 0) videoLimitError();

        // Aquí puedes manejar la lógica para guardar el video
        const videoName = await saveVideoService(req.files.video, 10);
         // Suponiendo que 'saveVideoService' guarda el video y devuelve el nombre

        // Insertar el video en la base de datos
        const videoId = await insertVideoModel(videoName, reelId, 10);
         // Suponiendo que 'insertVideoModel' inserta el video y devuelve el ID

        res.send({
            status: 'ok',
            data: {
                video: {
                    id: videoId,
                    name: videoName
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export default addReelVideoController;
