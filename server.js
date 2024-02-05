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
        connectionString:'postgres://mydb_te92_user:whI8shZNu7mgddne2n504T7EFmD7I6oA@dpg-cn0fvl6v3ddc73c1m59g-a/mydb_te92',
        ssl:{rejectUnauthorized:false},
        host: 'oregon-postgres.render.com',
        port: 5432,
        user: 'mydb_te92_user',
        password: 'whI8shZNu7mgddne2n504T7EFmD7I6oA',
        database: 'mydb_te92'
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



