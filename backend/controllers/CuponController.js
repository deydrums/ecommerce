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


/*________________________________________________________
 * 
 *  -----------------CUPONS GET ---------------------------
 * _______________________________________________________
 */

const getCupons = async(req,res = response)=>{

    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
    try {
        let filter = req.params['filter'];
        Cupon.find({code: new RegExp(filter,'i')}).sort({createdAt:-1}).exec((err,data)=>{
            if(err || !data ){
                return res.status(404).send({status: 'error', message: 'No se han encontrado cupones.'});
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
 *  ----------------CUPON  DELETE-------------------------
 * _______________________________________________________
 */

const deleteCupon = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    try {
        let id = req.params['id']; 

        Cupon.findByIdAndDelete({_id: id},{new:true},(err,data)=>{
            if(err || !data){
                return res.status(404).send({status: 'error', message: "No se puede eliminar este cupon"}); 
            }else{
                return res.status(200).send({status: 'success', message: 'Cupon eliminado', data:data});
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

/*________________________________________________________
 * 
 *  -----------------CUPON GET ---------------------------
 * _______________________________________________________
 */

const getCupon = async(req,res = response)=>{

    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
    try {
        let id = req.params['id'];
        Cupon.findById({_id: id}).exec((err,data)=>{
            if(err || !data ){
                return res.status(404).send({status: 'error', message: 'No se ha encontrado el cupon.'});
            }else{
                return res.status(200).send({status: 'success', data:data});
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }

}

module.exports = {
    registerCupon,
    getCupons,
    deleteCupon,
    getCupon
};