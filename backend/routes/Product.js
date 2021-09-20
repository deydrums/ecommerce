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
 const { registerProduct } = require('../controllers/ProductController');
 
 const multiparty = require('connect-multiparty')
 const path = multiparty({uploadDir: './uploads/products'});

 /*________________________________________________________
 * 
 *  ----------------CLIENT REGISTER-----------------------
 * _______________________________________________________
 */

 
 router.post(
    '/register',
    [
        auth.authenticated,
        path,
        check('title', 'El titulo no es valido').not().isEmpty(),
        check('stock', 'El stock no es valido').not().isEmpty(),
        check('price', 'El precio no es valido').not().isEmpty(),
        check('category', 'La categoria no es valida').not().isEmpty(),
        check('content', 'El contenido no es valido').not().isEmpty(),
        check('description', 'La description no es valida').not().isEmpty(),
        paramsValidator,
    ],
    registerProduct
);

// router.post(
//     '/register',
//     // username must be an email
//     body('title', 'El titulo no es valido').not().isEmpty(),
//     (req, res) => {
//       // Finds the validation errors in this request and wraps them in an object with handy functions
//       console.log(req.body)
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//     },
//   );
 module.exports = router;