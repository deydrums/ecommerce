'use strict'

const {Schema, model} = require('mongoose');

var ClientSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: false,
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
    profile: {
        type: String,
        default: 'profile.png',
        required: true,
    },
    telephone: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    birthday: {
        type: String,
        required: false,
    },
    dni: {
        type: String,
        required: false,
    }

});


module.exports = model('Client', ClientSchema);
