const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const mongodb = require('./mongodb_connection/connection');
const port = process.env.PORT;

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/pets', require('./routes/pets'));
app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/potential_owners', require('./routes/potential_owners'));
app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/api', require('./routes/swagger'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});