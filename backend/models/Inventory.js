'use strict'

const {Schema, model} = require('mongoose');

var InventorySchema = Schema({
    product: {type:Schema.Types.ObjectId, ref: 'Product', required: true},
    amount: {type: Number, required: true},
    admin: {type:Schema.Types.ObjectId, ref: 'Admin', required: true},
    supplier: {type: String , required: true},
    createdAt: {type: Date, default: Date.now, required:true}
});

module.exports = model('Inventory', InventorySchema);
