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

    const getProductsAdmin = async(req,res = response)=>{
        if(!req.user ||req.user.role !== 'admin'){
            return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
        }

        try {
            let filter = req.params['filter'];
            Product.find({title: new RegExp(filter,'i')}).exec((err,data)=>{
                if(err || !data ){
                    return res.status(404).send({status: 'error', message: 'No se han encontrado productos.'});
                }
                return res.status(200).send({status: 'success', data:data});
            });
            
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error, intenta de nuevo'
            })
        }
    }


    const getBanner = async(req,res = response)=>{
        try {
            const filename = req.params.filename
            const pathFile = './uploads/products/'+filename; 

            fs.exists(pathFile, (exists)=>{
                if(exists){
                    return res.sendFile(path.resolve(pathFile));
                }else{
                    return res.sendFile(path.resolve('./uploads/default.jpg'));
                }
            });

        } catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error, intenta de nuevo'
            })
        }

    }

 /*________________________________________________________
 * 
 *  ------------- GET PRODUCT ADMIN -----------------------
 * _______________________________________________________
 */

const getProductByIdAdmin = async(req,res = response) =>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    try {
        let id = req.params['id']; 
    
        Product.findById(id).exec((err,data)=>{
            if(err || !data){
                return res.status(404).send({status: 'error', message: 'No se ha encontrado el producto.'});
            }
            return res.status(200).send({status: 'success', data:data});
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }

}

/*________________________________________________________
 * 
 *  ----------------PRODUCT UPDATE----------------------
 * _______________________________________________________
 */

const updateProduct = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    try {
        let data = req.body;
        let id = req.params['id']; 
        Product.findById(id).exec((err,product)=>{
            if(err || !data ){
                if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
                return res.status(404).send({status: 'error', message: 'Producto no encontrado.'});
            }else{
 
                if(req.file.file_path){
                    if(req.file.file_ext != 'png' && req.file.file_ext != 'jpg' && req.file.file_ext != 'jpeg' && req.file.file_ext != 'webp'){
                        if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
                    }else{
                        if(product.banner && product.banner ==! undefined && product.banner ==! 'undefined'){
                            fs.unlinkSync('uploads/products/'+product.banner)
                        }
                        data = {
                            ...data,
                            banner: req.file.file_name,
                        }
                    }
                }
                
                
                Product.findByIdAndUpdate({_id: id},data,{new:true},(err,data)=>{
                    if(err || !data){
                        if(req.file.file_path){fs.unlinkSync(req.file.file_path)}

                        return res.status(404).send({status: 'error', message: "Ha ocurrido un error"}); 
                    }
                    //Devolver respuesta
                    return res.status(200).send({status: 'success', message: 'Producto actualizado', data:data});
                });
            }
        });

    } catch (error) {
        if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    registerProduct,
    getProductsAdmin,
    getBanner,
    getProductByIdAdmin,
    updateProduct
};
