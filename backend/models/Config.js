'use strict'

const {Schema, model} = require('mongoose');

var ConfigSchema = Schema({
    category: [{type: Object, required: true}],
    title: {type: String, required: true},
    logo: {type: String, required: true},
    serie: {type: Number, required: true},
    correlative: {type: Number, required: true},
});


module.exports = model('Config', ConfigSchema);
