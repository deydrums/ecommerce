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
const { registerCupon, getCupons, deleteCupon } = require('../controllers/CuponController');

/*________________________________________________________
 * 
 *  ----------------REGISTER CUPON ADMIN------------------
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

/*________________________________________________________
 * 
 *  ----------------REGISTER CUPON ADMIN------------------
 * _______________________________________________________
 */
 
router.get(
    '/:filter?',
    auth.authenticated,
    getCupons
)

/*________________________________________________________
 * 
 *  ------------------DELETE CUPON ADMIN------------------
 * _______________________________________________________
 */

router.delete(
    '/:id',
    auth.authenticated,
    deleteCupon
)

 module.exports = router;