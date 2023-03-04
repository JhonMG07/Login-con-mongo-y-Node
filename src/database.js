const mongoose = require("mongoose");

const {NOTES_APP_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE}=process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`
mongoose.set("strictQuery", true); //aqui va el nombre de la base de datos

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true
}).then(db=>{
  console.log("Connectado a MongoDB")
  console.log(`Puerto: ${NOTES_APP_MONGODB_HOST},NombreBD: ${NOTES_APP_MONGODB_DATABASE} `)
})
.catch(err => console.log(err));

