'use strict'

const {response} = require('express');
const Product = require('../models/Product');
var fs = require('fs');
var path = require('path');

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

        let data = req.body;

        if(req.files.banner){
            var file_path = req.files.banner.path;
            const file_split = file_path.split('\\');
            const file_name = file_split[2];
            const ext_split = file_name.split('\.');
            const file_ext = ext_split[1];
            if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'webp'){
                fs.unlinkSync(file_path)
            }else{
                data = {
                    ...data,
                    banner: file_name,
                }
            }
        }

        data= {
            ...data,
            slug: data.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
        }
        let product = new Product(data);
        await product.save();

        res.status(201).json({
            ok: true,
            message: 'Registro de producto exitoso',
            data:product
        });

    } catch (error) {
        console.log(error)
        if(req.files.banner){
            fs.unlinkSync(file_path)
        }
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    registerProduct
};
