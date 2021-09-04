'use strict'

const {response} = require('express');
const Client = require('../models/Client');
var bcrypt = require('bcryptjs');

const registerClient = async(req,res = response)=>{
    const {email, password} = req.body;
    try {
        let client = await Client.findOne({email: email});
        if(client){
            return res.status(400).json({
                ok: false,
                message: 'El correo ya fue registrado anteriormente'
            });
        };
        client = new Client(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        client.password = bcrypt.hashSync(password,salt);

        await client.save();
        //Generar nuestro JWT
        //const token = await generateJWT(user.id, user.name);

    
        res.status(201).json({
            ok: true,
            message: 'Registro exitoso',
            client
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
    registerClient,
};