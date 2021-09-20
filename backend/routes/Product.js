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
 const { registerProduct, getProductsAdmin, getBanner, getProductByIdAdmin, updateProduct } = require('../controllers/ProductController');
 
 const multiparty = require('connect-multiparty')
 const path = multiparty({uploadDir: './uploads/products'});

 /*________________________________________________________
 * 
 *  ----------------PRODUCT REGISTER-----------------------
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


/*________________________________________________________
 * 
 *  -----------LISTAR PRODUCTOS FILTRO ADMIN--------------
 * _______________________________________________________
 */

router.get(
    '/getProductsAdmin/:filter?',
    auth.authenticated,
    getProductsAdmin
)

/*________________________________________________________
 * 
 *  -----------OBTENER BANNER ADMIN ----------------------
 * _______________________________________________________
 */

router.get(
    '/getBanner/:filename',
    getBanner
)

 /*________________________________________________________
 * 
 *  ------------- GET PRODUCT ADMIN -----------------------
 * _______________________________________________________
 */

router.get(
    '/getProductByIdAdmin/:id',
    auth.authenticated,
    getProductByIdAdmin
)


 /*________________________________________________________
 * 
 *  ----------------PRODUCT REGISTER-----------------------
 * _______________________________________________________
 */

 
 router.put(
    '/update/:id',
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
    updateProduct
);


 module.exports = router;