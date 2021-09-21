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
const { registerConfig } = require('../controllers/ConfigController');
 const auth = require('../middlewares/authenticated');
 const { paramsValidator } = require('../middlewares/params-validator');

 /*________________________________________________________
 * 
 *  ----------------CONFIG REGISTER------------------------
 * _______________________________________________________
 */

 router.post(
        '/',
        [
            auth.authenticated,
        ],
        registerConfig
);
 
 module.exports = router;