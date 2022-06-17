//dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Address = require('./models/address');
const addressController = require('./controllers/address_controller');
app.use(express.json())

require('dotenv').config();


// Pulling port and MONGODB_URL from .env file
const { PORT, MONGODB_URL} = process.env;

mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

//MIDDLEWARES
app.use(cors());
app.use('/', addressController);


//ROOT
app.get('/', (req,res) => {
    res.send('home page')
})

// LISTEN
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})