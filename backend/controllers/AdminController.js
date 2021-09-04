'use strict'

const {response} = require('express');
const Admin = require('../models/Admin');
var bcrypt = require('bcryptjs');

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
            message: 'Registro exitoso',
            admin
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
    registerAdmin,
};