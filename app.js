const express = require("express");
const app = express();
const path = require('path');
const passport = require('passport');
require('./authentication/auth')

const session = require('express-session');
app.use(session({secret: process.env.SESSION_SECRET }))
app.use(passport.initialize());
app.use(passport.session()); 

function isLoggedIn(req, res, next) {
    req.user ? next(): res.sendStatus(401);
}

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const mongodb = require('./mongodb_connection/connection');
const port = process.env.PORT;

app.use(express.static('static'));

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/api-docs',
        failureRedirect: '/auth/failure'
    })
)

app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong. . .')
})

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/log-in.html'));
});

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/admins', isLoggedIn, require('./routes/admins'));

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/donators', isLoggedIn, require('./routes/donators'));

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/pets', isLoggedIn, require('./routes/pets'));

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/potential_owners', isLoggedIn, require('./routes/potential_owners'));

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/api', isLoggedIn, require('./routes/swagger'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});