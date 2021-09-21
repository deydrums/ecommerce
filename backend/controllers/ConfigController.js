'use strict'

const {response} = require('express');
const Config = require('../models/Config');

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

        const data = req.body;
        const newdata = {
            categories: data.categories,
            title: data.title,
            serie: data.serie,
            correlative: data.correlative
        };

        Config.findByIdAndUpdate({_id: '614a5e9084a1f888c440ec5e'},newdata,{new:true}).exec((err,data)=>{
            if(err || !data ){
                return res.status(404).send({status: 'error', message: 'No se ha podido actualizar la configuracion.'});
            }else{
                return res.status(200).send({status: 'success', message: 'Configuracion actualizada', data:data});
            }
        });

        // await Config.create({
        //     categories: [],
        //     title: 'Createx',
        //     logo: 'logo.png',
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