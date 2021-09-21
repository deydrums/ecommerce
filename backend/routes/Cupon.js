/**
 * 
 * Routas de Productos / Admin
 * host + /api/products
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { check } = require('express-validator');
 
 const router = Router();
 const { paramsValidator } = require('../middlewares/params-validator');
 const auth = require('../middlewares/authenticated');
const { registerCupon } = require('../controllers/CuponController');

/*________________________________________________________
 * 
 *  ----------------REGISTER INVENTORY ADMIN--------------
 * _______________________________________________________
 */
 
router.post(
    '/register',
    [
        auth.authenticated,
    ],
    registerCupon
);

 module.exports = router;