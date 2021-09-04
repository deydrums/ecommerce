/**
 * 
 * Routas de Clientes / Client
 * host + /api/auth
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { check } = require('express-validator');
 const router = Router();
 const { registerClient } = require('../controllers/ClientController');
 const { paramsValidator } = require('../middlewares/params-validator');

 router.post(
        '/register',
        [
            check('name', 'El nombre no es valido').not().isEmpty(),
            check('surname', 'El apellido no es valido').not().isEmpty(),
            check('email', 'El email no es valido').isEmail(),
            check('password', 'El password debe de ser de 8 caracteres').isLength({min: 8}), 
            paramsValidator
        ],
        registerClient
    );

 
 module.exports = router;