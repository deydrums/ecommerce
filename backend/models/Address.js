'use strict'

const {Schema, model} = require('mongoose');

var AddressSchema = Schema({
    client: {type:Schema.Types.ObjectId, ref: 'Client', required: true},
    receiver: {type: String , required: true},
    dni: {type: String , required: true},
    zip: {type: String , required: true},
    address: {type: String , required: true},
    country: {type: String , required: true},
    city: {type: String , required: true},
    telephone: {type: String , required: true},
    principal: {type: Boolean , required: true},
    createdAt: {type: Date, default: Date.now, required:true}
});

module.exports = model('Address', AddressSchema);
