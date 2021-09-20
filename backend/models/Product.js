'use strict'

const {Schema, model} = require('mongoose');

var ProductSchema = Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    gallery: [{type: Object, required: false}],
    banner: {type: String, required: false},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    stock: {type: Number, required: true},
    nsales: {type: Number, default: 0, required: true},
    npoints: {type: Number, default: 0, required: true},
    category: {type: String, required: true},
    status: {type: String, default: 'edit', required: true},
    createdAt: {type: Date, default: Date.now, required:true}
});


module.exports = model('Product', ProductSchema);
