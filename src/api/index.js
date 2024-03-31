const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const {createClient} = require('@supabase/supabase-js');

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_ANON_KEY);

app.use(cors());

app.get('/home', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('homepage_anime', {genre: req.query.genre})
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.get('/search', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('random_anime')
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.get('/searchAnime', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('search_anime', {search: req.query.search})
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.get('/genre', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('filter_genre');
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.get('/filter', async (req, res) => {
    try {
        const genresString = req.query.genres;
        const genres = genresString ? genresString.split(',').map(Number) : [];
        const { data, error } = await supabase.rpc('filter_anime', { genres: genres });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.log("Error occured");
        console.log(error);
        res.status(500).send('Server error');
    }
});
  
app.get('/anime', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('get_anime', {ani_id: req.query.id})
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.get('/animeGenre', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('get_genres', {ani_id: req.query.id})
        if(error) throw error;
        res.json(data);
        console.log(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});