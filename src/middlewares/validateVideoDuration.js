'use strict';

const validateVideoDuration = (req, res, next) => {
    // Aquí verificarías la duración del video antes de insertarlo en la base de datos
    const { duration } = req.body; // Suponiendo que envías la duración del video en el cuerpo de la solicitud
    
    if (duration && parseFloat(duration) <= 10) {
      // Si la duración es válida, puedes continuar con la siguiente operación
      next();
    } else {
      // Si la duración es mayor a 10 segundos, respondes con un mensaje de error
      return res.status(400).json({ error: 'La duración del video debe ser de máximo 10 segundos.' });
    }
  };
  
  export default validateVideoDuration;
  