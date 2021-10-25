'use strict'

const {Schema, model} = require('mongoose');

var CartSchema = Schema({
    product: {type:Schema.Types.ObjectId, ref: 'Product', required: true},
    client: {type:Schema.Types.ObjectId, ref: 'Client', required: true},
    amount: {type: Number, required: true},
    variety: {type: String , required: true},
    createdAt: {type: Date, default: Date.now, required:true}
});

module.exports = model('Cart', CartSchema);
