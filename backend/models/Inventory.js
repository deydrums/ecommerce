'use strict'

const {Schema, model} = require('mongoose');

var InventorySchema = Schema({
    product: {type: Schema.ObjectId, ref: 'product', required: true},
    amount: {type: Number, required: true},
    admin: {type: Schema.ObjectId, ref: 'admin', required: true},
    supplier: {type: string , required: true},
    createdAt: {type: Date, default: Date.now, required:true}
});


module.exports = model('Inventory', InventorySchema);
