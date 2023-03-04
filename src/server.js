const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); //para el envio de archivos
const path = require("path");

const flash = require("connect-flash"); //para saber que pasa despues de realizar una accion "se envia un mensaje"
const session = require("express-session");

const passport = require("passport");

const morgan = require("morgan");
const methodOverride = require("method-override");

//inicializaciones 
const app = express();
require("./config/passport");

//configuracion
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views")); //asignamos la ruta de la carpeta views
  //console.log(path.join(__dirname, "views")); mostrar la direccion de views
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"), //asignar carpeta
    partialsDir: path.join(app.get("views"), "partials"), //asignar carpeta
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Middlewares (funciones a medida que van llegando peticiones)
app.use(express.urlencoded({ extended: false })); //intentar convertir datos que llegan de un formulario en json
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "secret", //puede ser cualquier nombre
    resave: true,
    saveUninitialized :true
  })
);
    //funciones que usa pastport para funcionar
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); // ponemos nuestra categorias y guardamos en las variables del servidor
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash('error');

  res.locals.user =req.user || null;

  next();
});

//Rutas
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
app.use(require("./routes/users.routes"));
app.use(bodyParser.json());

//Archivos estaticos (publicos)
app.use(express.static(path.join(__dirname, "public"))); //asignamos la ruta de la carpeta public

module.exports = app;
