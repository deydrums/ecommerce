'use strict'

const {response} = require('express');
const Cupon = require('../models/Cupon');


/*________________________________________________________
 * 
 *  -----------------CUPON REGISTER-----------------------
 * _______________________________________________________
 */

const registerCupon = async(req,res = response)=>{

    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
    try {
        const data = req.body;
        const cupon = await Cupon.create(data);
        res.status(201).json({
            ok: true,
            message: 'Cupon creado',
            data:cupon
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }


}

module.exports = {
    registerCupon
};