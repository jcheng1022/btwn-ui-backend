const express = require('express');
const router = express.Router();
const Address = require('../models/address')


// GET METHOD
router.get('/address', async(req,res) => {
    try{
        res.json(await Address.find({}));
    } catch (error) {
        console.log('error ' + error);
        res.json({error: 'something went wrong'})
    }
})


// CREATE METHOD
router.post('/address', async(req,res) => {
    try{
        res.json(await Address.create(req.body))
    }catch (error) {
        console.log('error ' + error);
        res.json({error: 'something went wrong'})
    }
})

// DELETE METHOD
router.delete('/address/:id', async (req,res) => {
    try {
        res.json(await Address.findByIdAndDelete(req.params.id))
    }catch (error) {
        console.log('error ' + error);
        res.json({error: 'something went wrong'})
    }
})

// UPDATE METHOD
router.put('/address/:id', async (req,res) => {
    try {
        res.json(await Address.findByIdAndUpdate(req.params.id, req.body,  {new: true}))
    }catch (error) {
        console.log('error: ' , error)
        res.json({error: 'something went wrong'})
    }
})


module.exports = router;