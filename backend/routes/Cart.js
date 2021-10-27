/**
 * 
 * Routas de Clientes / Client
 * host + /api/client
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { addCart, getCartClient, deleteCart } = require('../controllers/CartController');
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

/*________________________________________________________
 * 
 *  ----------------OBTENER CARRITO ---------------------
 * _______________________________________________________
 */

router.get('/',[auth.authenticated],getCartClient);

/*________________________________________________________
 * 
 *  ----------------ELIMINAR CARRITO ---------------------
 * _______________________________________________________
 */

router.delete('/:id',[auth.authenticated],deleteCart);


 module.exports = router;