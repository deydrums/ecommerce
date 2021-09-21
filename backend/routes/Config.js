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
 const { updateConfig } = require('../controllers/ConfigController');
 const auth = require('../middlewares/authenticated');
 const { paramsValidator } = require('../middlewares/params-validator');

 /*________________________________________________________
 * 
 *  ----------------CONFIG REGISTER------------------------
 * _______________________________________________________
 */

 router.put(
        '/',
        [
            auth.authenticated,
            check('categories', 'Las categorias no son validas').not().isEmpty(),
            check('title', 'El titulo no es valido').not().isEmpty(),
            check('serie', 'El numero de serie no es valido').not().isEmpty(),
            check('correlative', 'El correlativo no es valido').not().isEmpty(), 
            paramsValidator
        ],
        updateConfig
);
 
 module.exports = router;