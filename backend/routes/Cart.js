/**
 * 
 * Routas de Clientes / Client
 * host + /api/client
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { addCart } = require('../controllers/CartController');
 const router = Router();
 const auth = require('../middlewares/authenticated');

/*________________________________________________________
 * 
 *  ----------------AGREGAR CARRITO -----------------------
 * _______________________________________________________
 */

 
 router.post(
    '/add',
    [   
        auth.authenticated,
    ],
    addCart
);

 module.exports = router;