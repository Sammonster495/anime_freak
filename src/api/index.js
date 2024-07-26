const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const {createClient} = require('@supabase/supabase-js');

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

app.use(cors(corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const store = new pgSession({
    pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL
    }),

});

store.set = (sid, sess, callback) => {
    store.query('INSERT INTO "session" ("sid", "sess", "expire", "user_id") VALUES ($1, $2, $3, $4) ON CONFLICT ("sid") DO UPDATE SET "sess" = $2, "expire" = $3, "user_id" = $4',
        [sid, JSON.stringify(sess), new Date(Date.now() + sess.cookie.maxAge), sess.userId],
        (err) => {
            if (err) {
                console.log(`Error saving session: ${sid}`);
                console.log(err);
            }
            if (callback) callback(err);
        }
    );
};

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, httpOnly:false},
    store: store
}));

async function getWatchlist(userId) {
    const {data, error} = await supabase.from('watchlist').select('anime_id').eq('user_id', userId);
    if (error) throw error;
    return data.map(item => item.anime_id);
}

app.post('/signup', async (req, res) => {
    try{
        const {firstname, lastname, username, password} = req.body;
        const {data, error} = await supabase.from('users').select().eq('username', username);
        if(error) throw error;
        if(data.length > 0) return res.status(400).send('An account under the provided username already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const {data: user, error: userError} = await supabase.from('users').insert([{username, password: hashedPassword, first_name: firstname, last_name: lastname}]);
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
        req.session.userId = user.id;
        req.session.watchlist = await getWatchlist(user.id);
        res.cookie('userId', req.session.userId, req.session.cookie)
        res.cookie('watchlist', req.session.watchlist, req.session.cookie)
        await req.session.save();
        res.status(201).send('Login successful');
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.get('/home', async (req, res) => {
    if(req.session.userId){
        try {
            const {data, error} = await supabase.rpc('homepage_anime', {genre: req.query.genre})
            if(error) throw error;
            res.json(data);
        }catch(error){
            console.log(error);
            res.status(500).send('Server error');
        }
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});