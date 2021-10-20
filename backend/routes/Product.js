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
 const { registerProduct, getProductsAdmin, getBanner, getProductByIdAdmin, updateProduct, deleteProduct, getInventoryAdmin, deleteInventoryAdmin, registerInventoryAdmin, addImgGallery, getImg, deleteImgGallery, getProducts, getProductBySlug, getRecommendedProducts } = require('../controllers/ProductController');
 
 const multiparty = require('connect-multiparty');
 const { filedata } = require('../middlewares/filedata');
 const path = multiparty({uploadDir: './uploads/products'});
 const path_gallery = multiparty({uploadDir: './uploads/gallery'});

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
        filedata,
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

 /*________________________________________________________
 * 
 *  ----------------PRODUCT DELETE-----------------------
 * _______________________________________________________
 */

 
 router.delete(
    '/delete/:id',
    [
        auth.authenticated,
    ],
    deleteProduct
);

/*________________________________________________________
 * 
 *  ----------------GET INVENTORY ADMIN-------------------
 * _______________________________________________________
 */
 
 router.get(
    '/getInventoryAdmin/:id',
    [
        auth.authenticated,
    ],
    getInventoryAdmin
);


/*________________________________________________________
 * 
 *  ----------------DELETE INVENTORY ADMIN----------------
 * _______________________________________________________
 */
 
router.delete(
    '/deleteInventoryAdmin/:id',
    [
        auth.authenticated,
    ],
    deleteInventoryAdmin
);

/*________________________________________________________
 * 
 *  ----------------REGISTER INVENTORY ADMIN--------------
 * _______________________________________________________
 */
 
router.post(
    '/registerInventoryAdmin',
    [
        auth.authenticated,
        check('amount', 'La cantidad no es valida').isInt().not().isEmpty(),
        check('supplier', 'El proveedor no es valido').not().isEmpty(),
        check('product', 'El proveedor no es valido').not().isEmpty(),
        paramsValidator,
    ],
    registerInventoryAdmin
);

 /*________________________________________________________
 * 
 *  ----------------UPLOAD IMG GALLERY--------------------
 * _______________________________________________________
 */

 
 router.put(
    '/addImgGallery/:id',
    [
        auth.authenticated,
        path_gallery,
        filedata,
    ],
    addImgGallery
);


/*________________________________________________________
 * 
 *  -----------OBTENER IMG GALLERY ----------------------
 * _______________________________________________________
 */

router.get(
    '/getImg/:filename',
    getImg
)


/*________________________________________________________
 * 
 *  -------------DELETE IMG GALLERY ----------------------
 * _______________________________________________________
 */

router.put(
    '/deleteImgGallery/:id',
    [
        auth.authenticated,
    ],
    deleteImgGallery
);


/*________________________________________________________
 * 
 *  -----------LISTAR PRODUCTOS FILTRO --------------------
 * _______________________________________________________
 */

router.get(
    '/getProducts/:filter?',
    getProducts
)

/*________________________________________________________
 * 
 *  -----------OBTENER PRODUCTO POR SLUG -----------------
 * _______________________________________________________
 */

router.get(
    '/getProductBySlug/:slug?',
    getProductBySlug
)

/*________________________________________________________
 * 
 *  -----------LISTAR PRODUCTOS RECOMENDADOS -------------
 * _______________________________________________________
 */

router.get(
    '/getRecommendedProducts/:category?',
    getRecommendedProducts
)

 module.exports = router;

 