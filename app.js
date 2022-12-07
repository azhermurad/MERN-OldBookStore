const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors')
const productRoute = require("./src/routers/product")
const userRoutes = require("./src/routers/userRoutes")
const dbConnection = require('./src/config/connection');
dotenv.config();

 


const app = express();
// connection to Database
dbConnection();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send(process.env.MONGODB_URL);
});
app.use(productRoute)
app.use(userRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Application is running on port:'.bgBlue, colors.red(port));
});
