'use strict'

const {response} = require('express');
const Cupon = require('../models/Cupon');


/*________________________________________________________
 * 
 *  -----------------CUPON REGISTER-----------------------
 * _______________________________________________________
 */

const registerCupon = async(req,res = response)=>{
    res.status(201).send({

        message:'success',
    });
}

module.exports = {
    registerCupon
};