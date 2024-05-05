const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt')
const {createClient} = require('@supabase/supabase-js');

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_ANON_KEY);

app.use(cors());
app.use(express.json());

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

app.get('/animeContent', async (req, res) => {
    try {
        const {data, error} = await supabase.rpc('get_content', {ani_id: req.query.id})
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.get('/animeCharacter', async (req, res) => {
    try{
        const {data, error} = await supabase.rpc('get_character', {ani_id: req.query.id})
        if(error) throw error;
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.post('/signup', async (req, res) => {
    try{
        const {name, username, password} = req.body;
        const {data, error} = await supabase.from('users').select().eq('username', username);
        if(error) throw error;
        if(data.length > 0) return res.status(400).send('An account under the provided username already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const {data: user, error: userError} = await supabase.from('users').insert([{username, password: hashedPassword, name}]);
        if(userError) throw userError;
        res.status(201).send('Your user account was created successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const {data, error} = await supabase.from('users').select().eq('username', username);
        if(error) throw error;
        if(data.length === 0) return res.status(400).send('Invalid login credentials');
        const user = data[0];
        const hashedPassword = user.password;
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if(!validPassword) return res.status(400).send('Invalid login credentials');
        res.status(201).send('Login successful');
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});