'use strict'

const {response} = require('express');
const Client = require('../models/Client');
var bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { returnUser } = require('../helpers/returnUser');


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
            data:returnUser(client)
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
            data:returnUser(client),
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

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    let type = req.params['type']; 
    let filter = req.params['filter'];

    if(type == null || type == 'null'){

        Client.find().exec((err,data)=>{
            if(err || !data){
                return res.status(404).send({status: 'error', message: 'No se han encontrado clientes.'});
            }
            return res.status(200).send({status: 'success', data:data});
        });

    }else{
        if(type == 'surname'){

            Client.find({surname: new RegExp(filter,'i')}).exec((err,data)=>{
                if(err || !data ){
                    return res.status(404).send({status: 'error', message: 'No se han encontrado clientes.'});
                }
                return res.status(200).send({status: 'success', data:data});
            });

        }else if (type == 'email'){

            Client.find({email: new RegExp(filter,'i')}).exec((err,data)=>{
                if(err || !data ){
                    return res.status(404).send({status: 'error', message: 'No se han encontrado clientes.'});
                }
                return res.status(200).send({status: 'success', data:data});
            });
        }
    }
    
}

/*________________________________________________________
 * 
 *  -------------CLIENT REGISTER ADMIN--------------------
 * _______________________________________________________
 */

const registerClientAdmin = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    const data = req.body;
    try {
        let client = await Client.findOne({email: data.email});
        if(client){
            return res.status(400).json({
                ok: false,
                message: 'El correo ya fue registrado anteriormente'
            });
        };
        client = new Client(data);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        client.password = bcrypt.hashSync('123456789',salt);

        await client.save();
    
        res.status(201).json({
            ok: true,
            message: 'Registro de cliente exitoso',
            data:client
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
 *  ------------- GET CLIENT ADMIN -----------------------
 * _______________________________________________________
 */

const getClientByIdAdmin = async(req,res = response) =>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    let id = req.params['id']; 
    
    Client.findById(id).exec((err,data)=>{
        if(err || !data){
            return res.status(404).send({status: 'error', message: 'No se ha encontrado el cliente.'});
        }
        return res.status(200).send({status: 'success', data:data});
    });

}

/*________________________________________________________
 * 
 *  ------------- UPDATE CLIENT ADMIN --------------------
 * _______________________________________________________
 */

const updateClientAdmin = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    const id = req.params['id'];
    const params = req.body;

    try {
            
        //Buscar si existe el cliente
        Client.findById(id).exec((err,data)=>{
            if(err || !data){
                return res.status(404).send({status: 'error', message: 'No se ha encontrado el cliente.'});
            }
            //Si existe el cliente, buscar que el email sea unico o que sea el mismo (No se actualizo)
            Client.findOne({email: params.email.toLowerCase()},(err, data)=>{
                if(err) {
                    return res.status(500).send({message: 'Error al intentar actualizar datos'});
                }
        
                if(data && data.email == params.email && data._id != id) {            
                    return res.status(400).send({message: 'El email ya esta registrado.'});
                }else{
                    //Si el email es unico o es el mismo, actualizar el cliente
                    Client.findByIdAndUpdate({_id: id},params,{new:true},(err,data)=>{
                        if(err || !data){
                            return res.status(500).send({status: 'error', message: "Error al actualizar usuario"}); 
                        }
                        //Devolver respuesta
                        return res.status(200).send({status: 'success', message: 'Usuario actualizado', data:data});
                    });
                }
            });
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
 *  ------------- UPDATE CLIENT ADMIN --------------------
 * _______________________________________________________
 */

const deleteClientAdmin = async(req,res = response)=>{

    //Si no existe un usuario y si no es admin
    if(!req.user ||req.user.role !== 'admin'){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    const id = req.params['id'];

    try {
        Client.findByIdAndDelete({_id: id},{new:true},(err,data)=>{
            if(err || !data){
                return res.status(404).send({status: 'error', message: 'No se ha encontrado el cliente.'});
            }else{
                return res.status(200).send({status: 'success', message: 'Usuario eliminado', data:data});
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
 *  ------------- GET CLIENT ADMIN -----------------------
 * _______________________________________________________
 */

const getClient = async(req,res = response) =>{

    //Si no existe un usuario y si no es admin
    if(!req.user){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }
    
    Client.findById(req.user.sub).exec((err,data)=>{
        if(err || !data){
            return res.status(404).send({status: 'error', message: 'No se ha encontrado el cliente.'});
        }
        return res.status(200).send({status: 'success', data:returnUser(data)});
    });

}

const renewToken = async(req,res = response)=>{

    if(!req.user){
        return res.status(400).send({status: 'error', message: 'No puedes realizar esta accion.'});
    }

    try {        
        const client = req.user;
        const user = await Client.findById({_id: client.sub});
        //Generar nuestro JWT
        const token = await generateJWT(user);
    
        res.json({
            ok: true,
            message: 'Nuevo token generado',
            data:returnUser(user),
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
    registerClient,
    loginClient,
    getClientsFilterAdmin,
    registerClientAdmin,
    getClientByIdAdmin,
    updateClientAdmin,
    deleteClientAdmin,
    getClient,
    renewToken
};