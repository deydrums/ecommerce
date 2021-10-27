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
        const data = {
            ...req.body,
            client: req.user.sub
        };

        const cartClient = await Cart.find({client: req.user.sub, product: data.product});
        if(cartClient.length == 0) {
            const reg = await Cart.create(data);
            res.status(201).json({
                ok: true,
                message: 'Producto agregado al carrito',
                data: reg
            });
        }else if(cartClient.length >= 1) {
            res.status(400).json({
                ok: false,
                message: 'El producto ya existe en el carrito',
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}


/*________________________________________________________
 * 
 *  ----------------AGREGAR CARRITO -----------------------
 * _______________________________________________________
 */

const deleteCart = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
     
    try {

        const id = req.params['id'];
        const reg = await Cart.findByIdAndRemove({_id:id})
        res.status(200).json({
            ok: true,
            message: 'Producto eliminado del carrito',
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


/*________________________________________________________
 * 
 *  ----------------OBTENER CARRITO ---------------------
 * _______________________________________________________
 */

const getCartClient = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
     
    try {
        const cart = await Cart.find({client: req.user.sub}).populate('product');
        res.status(200).json({
            ok: true,
            data: cart
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    addCart,
    getCartClient,
    deleteCart
};