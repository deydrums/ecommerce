'use strict'

const {Schema, model} = require('mongoose');

var ConfigSchema = Schema({
    categories: [{type: Object, required: true}],
    title: {type: String, required: true},
    banner: {type: String, required: true},
    serie: {type: String, required: true},
    correlative: {type: String, required: true},
});


module.exports = model('Config', ConfigSchema);
