const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors')
const productRoute = require("./src/routers/product")
const dbConnection = require('./src/config/connection');
dotenv.config();

 


const app = express();
// connection to Database
dbConnection();
app.use(cors())


app.get('/', (req, res) => {
    res.send(process.env.MONGODB_URL);
});
app.use(productRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Application is running on port:'.bgBlue, colors.red(port));
});
