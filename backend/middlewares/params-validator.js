const {response} = require('express');
const { validationResult } = require('express-validator');


const paramsValidator = (req, res = response, next) => {

    //Manejo de errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            message: 'Ha ocurrido un error de validación, comprueba los datos e intenta nuevamente.',
            errors: errors.mapped()
        });
    };
    
    next();
};

module.exports ={
    paramsValidator
}