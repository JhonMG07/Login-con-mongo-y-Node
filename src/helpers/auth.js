const helpers = {}

//middlewar para saber si un usuario peude accder a una ruta
helpers.isAuthenticated =(req,res,next) =>{
    if(req.isAuthenticated()){ //verifica si hay una sesion activa
        
        return next();
    }
    req.flash('error_msg','No estás autorizado, debes iniciar sesion primero.');
    res.redirect('/users/signin')
}

module.exports = helpers;