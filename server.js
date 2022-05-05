import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import signin from './controllers/signin';
import register from './controllers/register';
import image from './controllers/image';
import profile from './controllers/profile';


const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());


app.get('/', (req, res)=> {  
  res.send('success');
})

app.get('/test', (req, res)=> {
  res.send('this works')
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id' , (req, res) => { profile.handleProfile(req, res)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.listen(process.env.PORT || 3000);
