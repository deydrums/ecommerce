'use strict'

const {response} = require('express');
const Product = require('../models/Product');


/*________________________________________________________
 * 
 *  ----------------PRODUCT REGISTER----------------------
 * _______________________________________________________
 */

const registerProduct = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
    
    try {
        const data = req.body;
        console.log(req.body)
        var file_path = req.files;
        console.log(file_path)
        res.status(201).json({
            ok: true,
            message: 'Registro de producto exitoso',
            data
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    registerProduct
};
