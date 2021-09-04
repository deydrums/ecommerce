/**
 * 
 * Routas de Clientes / Client
 * host + /api/auth
 *  
 * */ 

 const {Router} = require('express');
 const router = Router();
 const { registerClient } = require('../controllers/ClientController');
 
 router.post(
        '/register',
        registerClient
    );

 
 module.exports = router;