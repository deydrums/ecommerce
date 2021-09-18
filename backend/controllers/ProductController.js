'use strict'

const {response} = require('express');
const Product = require('../models/Product');


/*________________________________________________________
 * 
 *  ----------------PRODUCT REGISTER----------------------
 * _______________________________________________________
 */

const registerProduct = async(req,res = response)=>{
    try {
        res.status(201).json({
            ok: true,
            message: 'Registro de producto exitoso',
            data:req.body
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
    registerProduct
};
