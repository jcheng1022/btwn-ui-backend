//dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Address = require('./models/address');
const addressController = require('./controllers/address_controller');
const admin = require('firebase-admin');


require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-service-key.json'))
});


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
// app.use('/', isAuthenticated, addressController);
app.use(express.json())
app.use(morgan('dev'))

//authorization middleware
app.use(async(req,res,next) => {
    const token = req.get('Authorization')
    if (token) {
        try {
            const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
        req.user = user;
        }catch(error) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
});

function isAuthenticated(req,res,next) {
    if(!req.user) {
        return res.status(401).json({message:'you must be logged in'})
    } else {
        return next();
    }
}


//ROOT
app.get('/', (req,res) => {
    res.send('home page')
})

// GET METHOD
app.get('/address', isAuthenticated, async(req,res) => {
    try{
        const googleId = req.user.uid;
        res.json(await Address.find({googleId}));
    } catch (error) {
        console.log('error ' + error);
        res.json({error: 'something went wrong'})
    }
})


// CREATE METHOD
app.post('/address',isAuthenticated, async(req,res) => {
    try{
        req.body.googleId = req.user.uid;
        res.json(await Address.create(req.body))
    }catch (error) {
        console.log('error ' + error);
        res.json({error: 'something went wrong'})
    }
})

// DELETE METHOD
app.delete('/address/:id',isAuthenticated, async (req,res) => {
    try {
        res.json(await Address.findByIdAndDelete(req.params.id))
    }catch (error) {
        console.log('error ' + error);
        res.json({error: 'something went wrong'})
    }
})

// UPDATE METHOD
app.put('/address/:id',isAuthenticated, async (req,res) => {
    try {
        res.json(await Address.findByIdAndUpdate(req.params.id, req.body,  {new: true}))
    }catch (error) {
        console.log('error: ' , error)
        res.json({error: 'something went wrong'})
    }
})


// LISTEN
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})