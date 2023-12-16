'use strict';

import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { saveFileError, deleteFileError } from './errorService.js';

dotenv.config();
const { UPLOADS_DIR } = process.env;

export const saveVideoService = async (video, maxSizeInMB) => {
    try {
        const uploadDir = path.join(process.cwd(), `./src/${UPLOADS_DIR}`);

        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir);
        }

        const videoName = `${uuid()}.mp4`; // Cambia la extensión según el tipo de video

        const videoPath = path.join(uploadDir, videoName);

        // Guarda el video en el disco
        await fs.writeFile(videoPath, video.data);

        return videoName;
    } catch (error) {
        saveFileError();
    }
};

export const deleteVideoService = async (videoName) => {
    try {
        const videoPath = path.join(process.cwd(), `./src/${UPLOADS_DIR}`, videoName);

        try {
            await fs.access(videoPath);
        } catch {
            return;
        }

        await fs.unlink(videoPath);
    } catch (error) {
        deleteFileError();
    }
};
