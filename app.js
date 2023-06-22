const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const mongodb = require('./mongodb_connection/connection');
const port = process.env.PORT;

app.use('/pets', require('./routes/pets'));
app.use('/potential_owners', require('./routes/potential_owners'));
app.use('/api', require('./routes/swagger'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});