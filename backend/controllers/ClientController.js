'use strict'

const {response} = require('express');
const Client = require('../models/Client');
var bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


/*________________________________________________________
 * 
 *  ----------------CLIENT REGISTER-----------------------
 * _______________________________________________________
 */

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
            message: 'Registro de cliente exitoso',
            data:client
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
 *  ----------------CLIENT LOGIN -------------------------
 * _______________________________________________________
 */


const loginClient = async(req,res = response)=>{
    const {email, password} = req.body

    try {
        const client = await Client.findOne({email: email});
        if(!client){
            return res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado'
            });
        };

        //Confirmar password
        const validPassword = bcrypt.compareSync(password, client.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                message: 'Password incorrecto'
            });
        };

        //Generar nuestro JWT
        const token = await generateJWT(client);

        res.status(200).json({
            ok: true,
            message: 'Login correcto',
            data:client,
            token: token
            //token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        });
    }
}

/*________________________________________________________
 * 
 *  -----------LISTAR CLIENTES FILTRO ADMIN---------------
 * _______________________________________________________
 */

const getClientsFilterAdmin = async(req,res = response)=>{

    Client.find().exec((err,clients)=>{
        if(err || !clients){
            return res.status(404).send({status: 'error', message: 'No se han encontrado usuarios.'});
        }
        return res.status(200).send({status: 'success', data:clients});
    });

}


module.exports = {
    registerClient,
    loginClient,
    getClientsFilterAdmin
};