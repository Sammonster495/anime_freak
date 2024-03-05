const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/home', async (req, res) => {
    const genre = req.query.genre;
    const client = await pool.connect();
    try {
        const anime = await client.query('SELECT a.image, a.eng_title FROM anime a, anime_genres ag, genre g WHERE a.id = ag.anime_id AND ag.genre_id = g.id AND g.name = $1 ORDER BY ratings DESC LIMIT 10;', [genre]);
        res.json(anime.rows);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }finally{
        client.release();
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
