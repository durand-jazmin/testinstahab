'use strict';


import express from 'express';
import validateVideoDuration from '../middlewares/validateVideoDuration.js';

const router = express.Router();

// Ruta para la inserción de videos con el middleware de validación de duración
router.post('/insertar', validateVideoDuration, (req, res) => {
  // Aquí manejarías la inserción del video en la base de datos
  // ...
  res.status(200).json({ message: 'Video insertado correctamente.' });
});

export default router;
