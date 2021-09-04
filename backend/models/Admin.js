'use strict'

const {Schema, model} = require('mongoose');

var AdminSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    },
    dni: {
        type: String,
        required: true,
    }

});


module.exports = model('Admin', AdminSchema);
