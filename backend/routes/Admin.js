/**
 * 
 * Routas de Administradores / Admin
 * host + /api/admin
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { check } = require('express-validator');
 const router = Router();
 const { registerAdmin } = require('../controllers/AdminController');
 const { paramsValidator } = require('../middlewares/params-validator');

 router.post(
        '/register',
        [
            check('name', 'El nombre no es valido').not().isEmpty(),
            check('surname', 'El apellido no es valido').not().isEmpty(),
            check('email', 'El email no es valido').isEmail(),
            check('password', 'El password debe de ser de 8 caracteres').isLength({min: 8}), 
            check('telephone', 'El telefono no es valido').not().isEmpty(),
            check('rol', 'El rol no es valido').not().isEmpty(),
            check('dni', 'El dni no es valido').not().isEmpty(),
            paramsValidator
        ],
        registerAdmin
    );

 
 module.exports = router;