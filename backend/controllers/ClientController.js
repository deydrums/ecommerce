'use strict'

const {response} = require('express');
const Client = require('../models/Client');


const registerClient = async(req,res = response)=>{
    res.status(200).json({
        ok: true,
        message: 'Hola'
    })
}
module.exports = {
    registerClient,
};