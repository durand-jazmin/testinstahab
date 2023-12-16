import getPool from "../../database/getPool.js";

const selectAllReelsModel = async () => {
    const pool = await getPool();

    const [reels] = await pool.query(
        `
            SELECT r.id, r.title, r.place, u.username, AVG(IFNULL(v.value,0)) AS likes, e.createdAt
            FROM reels e
            LEFT JOIN reellikes v ON v.reelId = e.id
            INNER JOIN users u ON u.id = e.userId
            GROUP BY e.id
            ORDER BY e.createdAt DESC  `
    );

    for(const reel of reels){
        const [photos] = await pool.query(
            `
                SELECT id, name FROM reelphotos WHERE reelId=?
            `,
            [reel.id]
        );
        const [videos] = await pool.query(
            `
                SELECT id, name FROM reelvideos WHERE reelId = ?
            `,
            [reel.id]
        );

        
        //creo una nueva clave al objeto dentro del array
        reel.photos = photos;
        reel.videos = videos;
    }

    return reels;
}

export default selectAllReelsModel;

/**Este modelo está diseñado para recuperar todas los reels y sus fotos asociadas de la base de datos.
 *  La función retorna un array de objetos donde cada objeto representa un reel con su información 
 * y una lista de fotos asociadas a esa reel. */