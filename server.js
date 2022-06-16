//dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

///////////////////////////////////////////////////////////////////////////////////////////
////////////////Uncomment below codeblock once MongoDB database is made////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// mongoose.connect(MONGODB_URL);
// Connection Events
// mongoose.connection
//     .on("open", () => console.log("You are connected to mongoose"))
//     .on("close", () => console.log("You are disconnected from mongoose"))
//     .on("error", (error) => console.log(error));

//MIDDLEWARES
app.use(cors());

// Pulling port from .env file
const PORT = process.env.PORT;

//ROOT
app.get('/', (req,res) => {
    res.send('home page')
})

// LISTEN
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})