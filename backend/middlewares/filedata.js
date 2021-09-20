'use strict'

exports.filedata = function(req, res, next) {

    
    try{
        if(req.files.banner){
            var file_path = req.files.banner.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];
        }

        var data ={
            file_path,
            file_name,
            file_ext
        }

    }catch(ex){
        return res.status(400).send({status: 'error', message:'El banner no es valido'});
    }

    //Adjuntar usuario identificado a la request
    req.file = data;
    //Pasar a la accion
    next();
};