/**
 * 
 * Routas de Clientes / Client
 * host + /api/client
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { check } = require('express-validator');
 const router = Router();
 const { registerClient, loginClient, getClientsFilterAdmin, registerClientAdmin, getClientByIdAdmin, updateClientAdmin, deleteClientAdmin, getClient, renewToken, updateClient, registerAddress, getAddresses } = require('../controllers/ClientController');
 const { paramsValidator } = require('../middlewares/params-validator');
 const auth = require('../middlewares/authenticated');

 /*________________________________________________________
 * 
 *  ----------------CLIENT REGISTER-----------------------
 * _______________________________________________________
 */

 
 router.post(
        '/register',
        [
            check('name', 'El nombre no es valido').not().isEmpty(),
            check('surname', 'El apellido no es valido').not().isEmpty(),
            check('email', 'El email no es valido').isEmail(),
            check('password', 'El password debe de ser de 8 caracteres').isLength({min: 8}), 
            paramsValidator
        ],
        registerClient
);

/*________________________________________________________
 * 
 *  ----------------CLIENT LOGIN -------------------------
 * _______________________________________________________
 */


router.post(
    '/login',
    [
        check('email', 'El email no es valido').isEmail(),
        check('password', 'El password debe de ser de 8 caracteres').isLength({min: 8}), 
        paramsValidator
    ],
    loginClient
);

/*________________________________________________________
 * 
 *  -----------LISTAR CLIENTES FILTRO ADMIN---------------
 * _______________________________________________________
 */

router.get(
    '/getClientsFilterAdmin/:type/:filter?',
    auth.authenticated,
    getClientsFilterAdmin
)

 /*________________________________________________________
 * 
 *  -------------CLIENT REGISTER ADMIN--------------------
 * _______________________________________________________
 */

router.post(
    '/registerClientAdmin',
    [   
        auth.authenticated,
        check('name', 'El nombre no es valido').not().isEmpty(),
        check('surname', 'El apellido no es valido').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('telephone', 'El telefono no es valido').isLength({min: 7}), 
        check('birthday', 'La fecha de nacimiento no es valida').not().isEmpty(),
        check('dni', 'Del DNI no es valido').not().isEmpty(),
        check('gender', 'El genero no es valido').not().isEmpty(),
        paramsValidator
    ],
    registerClientAdmin
)


/*________________________________________________________
 * 
 *  ------------- GET CLIENT ADMIN -----------------------
 * _______________________________________________________
 */

router.get(
    '/getClientByIdAdmin/:id',
    auth.authenticated,
    getClientByIdAdmin
)

 /*________________________________________________________
 * 
 *  -------------CLIENT REGISTER ADMIN--------------------
 * _______________________________________________________
 */

 router.put(
    '/updateClientAdmin/:id',
    [   
        auth.authenticated,
        check('name', 'El nombre no es valido').not().isEmpty(),
        check('surname', 'El apellido no es valido').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('telephone', 'El telefono no es valido').isLength({min: 7}), 
        check('birthday', 'La fecha de nacimiento no es valida').not().isEmpty(),
        check('dni', 'Del DNI no es valido').not().isEmpty(),
        check('gender', 'El genero no es valido').not().isEmpty(),
        paramsValidator
    ],
    updateClientAdmin
)


 /*________________________________________________________
 * 
 *  ---------------CLIENT DELETE ADMIN--------------------
 * _______________________________________________________
 */

 router.delete(
    '/deleteClientAdmin/:id', 
    auth.authenticated,
    deleteClientAdmin
)

/*________________________________________________________
 * 
 *  ------------- GET CLIENT  ----------------------------
 * _______________________________________________________
 */

router.get(
    '/getClient',
    auth.authenticated,
    getClient
)

/*________________________________________________________
 * 
 *  ------------- Renew Token  ----------------------------
 * _______________________________________________________
 */

router.get(
    '/renew',
    auth.authenticated,
    renewToken
)


 /*________________________________________________________
 * 
 *  -------------CLIENT REGISTER ADMIN--------------------
 * _______________________________________________________
 */

 router.put(
    '/updateClient/:id',
    [   
        auth.authenticated,
        check('name', 'El nombre no es valido').not().isEmpty(),
        check('surname', 'El apellido no es valido').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        paramsValidator
    ],
    updateClient
)


/****************************************************************************************************************
 * DIRECCIONES
*****************************************************************************************************************/



/*________________________________________________________
 * 
 *  -----------------ADDRESS REGISTER---------------------
 * _______________________________________________________
 */
router.post(
    '/registerAddress',
    [
        auth.authenticated,
        check('receiver', 'El destinatario no es valido').not().isEmpty(),
        check('dni', 'El dni no es valido').not().isEmpty(),
        check('zip', 'El zip no es valido').not().isEmpty(),
        check('address', 'La direccion no es valida').not().isEmpty(),
        check('city', 'La ciudad no es valida').not().isEmpty(),
        check('telephone', 'El telefono no es valido').not().isEmpty(),
        check('principal', 'El principal no es valido').not().isEmpty(),
        paramsValidator
    ],
    registerAddress
);

/*________________________________________________________
 * 
 *  -----------------ADDRESSES GET -----------------------
 * _______________________________________________________
 */
router.get('/getAddresses', auth.authenticated, getAddresses);

 module.exports = router;