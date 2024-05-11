const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
        connectionString:'postgres://db_2_wozr_user:FNvSArgVz6hSZ5QmYz0zodui2EpRZJ73@dpg-covfi7o21fec73fjnbf0-a/db_2_wozr',
        ssl:{rejectUnauthorized:false},
        host: 'oregon-postgres.render.com',
        port: 5432,
        user: 'db_2_wozr_user',
        password: 'FNvSArgVz6hSZ5QmYz0zodui2EpRZJ73',
        database: 'db_2_wozr'
    }
});

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('success')
})

app.post('/signin', signin.handleSignin( db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(3000, () => {
    console.log('app is runnung on the port 3000');
})



