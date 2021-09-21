'use strict'

const {Schema, model} = require('mongoose');

var CuponSchema = Schema({
    code: {type: String, required: true},
    type: {type: String, required: true}, //Porcentaje // precio fijo
    value: {type: Number, required: true},
    limit: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now, required:true}
});

module.exports = model('Cupon', CuponSchema);
