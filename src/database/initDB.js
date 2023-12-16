'use strict';

import getPool from './getPool.js';

const initDB = async () => {
    try {
        let pool = await getPool();

        // console.log('Elimando base de datos...');

        // await pool.query(
        //     'DROP DATABASE IF EXISTS diary'
        // );

        // console.log('Creando base de datos...');

        // await pool.query(
        //     'CREATE DATABASE diary'
        // );

        console.log('Eliminando tablas...');

        await pool.query(
            'USE instahab'
        );
        
        await pool.query(
            'DROP TABLE IF EXISTS reelsLikes, reelPhotos, reels, users'
        );
        
        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
      `);
     
      await pool.query(`
        CREATE TABLE IF NOT EXISTS reels (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL,
            place VARCHAR(30) NOT NULL,
            description TEXT NOT NULL,
            userId INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (userId) REFERENCES users(id)
        )
     `);

     await pool.query(`
            CREATE TABLE IF NOT EXISTS reelPhotos (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                reelId INT NOT NULL,
                FOREIGN KEY (reelId) REFERENCES reels(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
    `);
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS reelVideos (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        reelId INT NOT NULL,
        duration FLOAT NOT NULL,
        FOREIGN KEY (reelId) REFERENCES reels(id),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS reelLikes (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                value TINYINT UNSIGNED NOT NULL,
                userId INT NOT NULL,
                reelId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (reelId) REFERENCES reels(id)
            )
    `);
    console.log('Tablas creadas!');
    
    } catch (error) {
        console.log(error);
    }
}

initDB();