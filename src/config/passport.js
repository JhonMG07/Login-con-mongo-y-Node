//variable para mantener el usuario conectado
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

//Middlewar para iniciar sesion
//nombre de la funcion
passport.use(
  /*
  "login", //pude ir un nombre del middlewar o por defecto tiene local
  */
  "local",
    new LocalStrategy({

      usernameField: "email",
      passwordField: "password",
      
    }, async (email, password, done) => {// recibimos los datos y el callback "done" y este callback tiene conexion con flash
      //confirmar si existe el correo
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, {message: "No se ha encontrado un correo existente",});
        } else {
          //validar contraseña
          const validacion = await user.matchPassword(password); 

          if (validacion) {
            return done(null, user); //acaba si encontramos y devuelve el usuario 
          } else {
            return done(null, false, { message: "Contraseña incorrecta" }); //acaba y muestra el erro
          }
      }
    }
  )
);
//Como hace passport para guardar el usuario?

passport.serializeUser((user, done) => { //recive una funcion y guarda el id
  done(null, user.id);
});
passport.deserializeUser((id, done) => {// comprueba en la base de datos si ese id tiene permiso
  
  User.findById(id, (err, user) => {
    done(err, user);
  }); //ahora integramos esto al servidor
});
