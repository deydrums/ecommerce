/**
 * 
 * Routas de Administradores / Admin
 * host + /api/admin
 *  
 * */ 
 'use strict'
 

 const {Router} = require('express');
 const { check } = require('express-validator');
 const router = Router();
 const { updateConfig, getConfig, getLogo, getConfigAll } = require('../controllers/ConfigController');
 const auth = require('../middlewares/authenticated');
 const { paramsValidator } = require('../middlewares/params-validator');

 const multiparty = require('connect-multiparty');
 const { filedata } = require('../middlewares/filedata');
 const path = multiparty({uploadDir: './uploads/config'});

 /*________________________________________________________
 * 
 *  ----------------CONFIG UPPDATE------------------------
 * _______________________________________________________
 */

 router.put(
        '/',
        [
            auth.authenticated,
            path,
            filedata,
            check('categories', 'Las categorias no son validas').not().isEmpty(),
            check('title', 'El titulo no es valido').not().isEmpty(),
            check('serie', 'El numero de serie no es valido').not().isEmpty(),
            check('correlative', 'El correlativo no es valido').not().isEmpty(), 
            paramsValidator
        ],
        updateConfig
);

 /*________________________________________________________
 * 
 *  ----------------CONFIG GET ---------------------------
 * _______________________________________________________
 */

 router.get(
    '/',
    [
        auth.authenticated,
    ],
    getConfig
);
 
/*________________________________________________________
 * 
 *  -----------OBTENER BANNER ADMIN ----------------------
 * _______________________________________________________
 */

router.get(
    '/getLogo/:filename',
    getLogo
)

 /*________________________________________________________
 * 
 *  ----------------CONFIG GET ---------------------------
 * _______________________________________________________
 */

 router.get(
    '/all',
    getConfigAll
);
 

 module.exports = router;