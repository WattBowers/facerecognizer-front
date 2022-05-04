import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';
import signin from './controllers/signin.js';
import register from './controllers/register.js';
import image from './controllers/image.js';
import profile from './controllers/profile.js'


const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();
app.use(express.json());
app.use(cors())

//adding a comment to see what happens on github
app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id' , (req, res) => { profile.handleProfile(req, res)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
