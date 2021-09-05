'use strict'


/*________________________________________________________
 * 
 *  ----------------GENERAR TOKEN ------------------------
 * _______________________________________________________
 */

const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub:user._id, 
            name:user.name,
            surname:user.surname,
            email:user.email
        };
        console.log(payload);
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn: process.env.TOKEN_EXPIRES_TIME
        },(err, token)=>{
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            };

            resolve(token);
        });
    });
};

module.exports = {
    generateJWT
}