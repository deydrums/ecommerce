'use strict'

const {response} = require('express');
const Config = require('../models/Config');

/*________________________________________________________
 * 
 *  ----------------CLIENT REGISTER-----------------------
 * _______________________________________________________
 */

const registerConfig = async(req,res = response)=>{

    try {
        res.status(201).json({
            ok: true,
            message: 'Registro de configuracion exitoso',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}


module.exports = {
    registerConfig,
};