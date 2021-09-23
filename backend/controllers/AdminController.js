'use strict'

const {response} = require('express');
const Admin = require('../models/Admin');
var bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

/*________________________________________________________
 * 
 *  ----------------ADMIN REGISTER------------------------
 * _______________________________________________________
 */

const registerAdmin = async(req,res = response)=>{
    const {email, password} = req.body;
    try {
        let admin = await Admin.findOne({email: email});
        if(admin){
            return res.status(400).json({
                ok: false,
                message: 'El correo ya fue registrado anteriormente'
            });
        };
        admin = new Admin(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password,salt);

        await admin.save();

        //Generar nuestro JWT
        //const token = await generateJWT(user.id, user.name);

    
        res.status(201).json({
            ok: true,
            message: 'Registro de usuario administrador exitoso',
            data:admin
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
 *  ----------------ADMIN LOGIN --------------------------
 * _______________________________________________________
 */

const loginAdmin = async(req,res = response)=>{
    const {email, password} = req.body

    try {
        const admin = await Admin.findOne({email: email});
        if(!admin){
            return res.status(404).json({
                ok: false,
                message: 'Usuario administrador no encontrado'
            });
        };

        //Confirmar password
        const validPassword = bcrypt.compareSync(password, admin.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                message: 'Password incorrecto'
            });
        };

        //Generar nuestro JWT
        const token = await generateJWT(admin);

        res.status(200).json({
            ok: true,
            message: 'Login correcto',
            data:admin,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        });
    }
}

const renewToken = async(req,res = response)=>{

    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    try {        
        const admin = req.user;
        const user = await Admin.findById({_id: admin.sub});
        //Generar nuestro JWT
        const token = await generateJWT(user);
    
        res.json({
            ok: true,
            message: 'Nuevo token generado',
            data:user,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    renewToken
};