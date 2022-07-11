const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const dbConnection = require('./src/config/connection');
dotenv.config();

const app = express();
// connection to Database
dbConnection();

app.get('/', (req, res) => {
    res.send(process.env.MONGODB_URL);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Application is running on port:'.bgBlue, colors.red(port));
});
