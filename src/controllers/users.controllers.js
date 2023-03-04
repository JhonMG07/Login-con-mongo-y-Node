const userCtrl = {};


const passport = require('passport');
const User = require('../models/User');

//FORMULARIO RENDER Y GUARDAR
userCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup"); //renderiso el fondulario
};

userCtrl.SignUp = async(req, res) => {
  const { name, email, password, confirm_password } = req.body;
  
  const errors = [];
  
  if (password != confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden' });
  }
  if (password.length < 4) {
    errors.push({ text: 'La contraseña debe tener mas de 4 caracteres' });
  }
  //enviar los datos al cliente
  
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email
      //devolvemos los campos para que no se borren del login
    });
  } else {
    
     const emailUser = await User.findOne({email:email})
     if(emailUser){
        req.flash('error_msg', 'El correo ya está en uso.')
        res.redirect('/users/signup')
     }else{
        newUser= new User({name: name,email: email,password: password});
        //incriptar la contraseña
        newUser.password = await newUser.encryptPassword(password);
        //guardamos en la base de datos
        await newUser.save();
        req.flash('success_msg', "Registro Exitoso")
        res.redirect('/users/signin')
     }

  }
};

//Iniciar sesion

  /*vamos a usar passport (guarda la logica para la autentificacion con el login)
  para mantener las sesion iniciada, (el login)

  */

userCtrl.renderSignInForm = (req, res) => {
  
  res.render("users/signin"); //renderiso el fondulario
};

userCtrl.SignIn = passport.authenticate('local',{
  failureRedirect: '/users/signin', //si hay error redireccionamos aqui
  successRedirect: '/notes',
  failureFlash: true
} );


//salir

userCtrl.logOut = (req, res) => {
  req.logout((err)=>{
    if(err){
      console.log(err);
      return res.send(err);
    }else{
      req.flash('success_msg', 'Has cerrado sesion');
      res.redirect('/users/SignIn')
    }
  });

};

module.exports = userCtrl;
