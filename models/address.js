const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name:String,
    address:String,
    googleId: String

}, {timestamps: true})

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;