import getPool from "../../database/getPool.js";

const selectReelByIdModel = async (reelId, isPhoto = true) => {
    
    const pool = await getPool();
let reel =[];

   
if (isPhoto) {
    [reel] = await pool.query(
        `
            SELECT r.id, r.title, r.place, u.username, r.userId, AVG(IFNULL(v.value, 0)) AS likes, r.createdAt
            FROM reels e
            LEFT JOIN reellikes v ON v.reelId = r.id
            INNER JOIN users u ON u.id = r.userId
            LEFT JOIN reelphotos p ON p.reelId = r.id
            WHERE r.id = ${reelId}
            GROUP BY r.id
            ORDER BY r.createdAt DESC
        `
    );

} else {
    [reel] = await pool.query(
        `
            SELECT r.id, r.title, r.place, u.username, r.userId, AVG(IFNULL(v.value, 0)) AS likes, r.createdAt
            FROM reels r
            LEFT JOIN reellikes v ON v.reelId = r.id
            INNER JOIN users u ON u.id = r.userId
            LEFT JOIN reelvideos vid ON vid.reelId = r.id
            WHERE .id = ${reelId}
            GROUP BY r.id
            ORDER BY r.createdAt DESC
        `
    );
}

return reel[0];
}

export default selectReelByIdModel;
/* este modelo selecciona un reel específico según su ID en la base de datos.
 Realiza una consulta para obtener reel con detalles como título, lugar,
  nombre de usuario del creador, promedio de likes, fecha de creación, y también 
  obtiene las fotos y videos asociadas a ese reel. Luego, asocia las fotos y videos específicos antes de devolverlo.*/