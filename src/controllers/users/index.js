'use strict';

import newUserController from "./newUserController.js";
import loginUserController from "./loginUserController.js";
import validateUserController from "./validateUserController.js";
import getUserProfileController from "./getUserProfileController.js";
import getOwnUserController from "./getOwnUserController.js";
import editUserAvatarController from "./editUserAvatarController.js";

export {
    newUserController,
    loginUserController,
    validateUserController,
    getUserProfileController,
    getOwnUserController,
    editUserAvatarController
}

/* este archivo actúa como un punto central para exportar los distintos 
controladores que manejan diferentes aspectos de la aplicación, como 
la creación de usuarios, inicio de sesión, validación de usuarios, 
obtención de perfiles, entre otros. Estos controladores se importan
 desde otros archivos y se exportan aquí para poder acceder a ellos 
 desde diferentes partes de la aplicación.*/