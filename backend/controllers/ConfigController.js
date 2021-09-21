'use strict'

const {response} = require('express');
const Config = require('../models/Config');
var fs = require('fs');
var path = require('path');

/*________________________________________________________
 * 
 *  ----------------CLIENT REGISTER-----------------------
 * _______________________________________________________
 */

const updateConfig = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    try {

        let data = req.body;
        let config = await Config.findById({_id: process.env.CONFIG_ID});

        if(req.file.file_path){
            if(req.file.file_ext != 'png' && req.file.file_ext != 'jpg' && req.file.file_ext != 'jpeg' && req.file.file_ext != 'webp'){
                if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
            }else{
                if(config.banner !== undefined && config.banner !== 'undefined'){
                    fs.stat('uploads/config/'+config.banner,(err)=>{
                        if(!err){
                            fs.unlinkSync('uploads/config/'+config.banner);
                        }
                    })
                }
                data = {
                    ...data,
                    banner: req.file.file_name,
                }
            }
        }

        Config.findByIdAndUpdate({_id: process.env.CONFIG_ID},data,{new:true}).exec((err,data)=>{
            if(err || !data ){
                return res.status(404).send({status: 'error', message: 'No se ha podido actualizar la configuracion.'});
            }else{
                return res.status(200).send({status: 'success', message: 'Configuracion actualizada', data:data});
            }
        });

        // await Config.create({
        //     categories: [],
        //     title: 'Createx',
        //     banner: 'logo.png',
        //     serie: '0001',
        //     correlative: '000001'
        // });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}


module.exports = {
    updateConfig,
};