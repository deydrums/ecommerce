'use strict'

const {response} = require('express');
const Client = require('../models/Client');
const Cart = require('../models/Cart');


/*________________________________________________________
 * 
 *  ----------------AGREGAR CARRITO -----------------------
 * _______________________________________________________
 */

const addCart = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
        
    try {
        const data = req.body;
        const reg = await Cart.create(data);

        res.status(201).json({
            ok: true,
            message: 'Producto agregado al carrito',
            data: reg
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
    addCart,
};