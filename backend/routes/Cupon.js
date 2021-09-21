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
        check('code', 'El codigo no es valido').not().isEmpty(),
        check('type', 'El tipo no es valido').not().isEmpty(),
        check('value', 'El valor no es valido').isInt().not().isEmpty(),
        check('limit', 'El limite no es valido').isInt().not().isEmpty(), 
        paramsValidator
    ],
    registerCupon
);

 module.exports = router;