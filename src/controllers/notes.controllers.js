const notesCtrl = {};

const Note = require("../models/Note"); //importamos el modelo

notesCtrl.renderNoteForm = (req, res) => {
  console.log(req.user.id); //muestro los elementos de mi usuario
  //formulario de nota nueva
  res.render("notes/new-notes"); //renderisa vistas
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;

  const newNote = new Note({ titulo: title, description });

  newNote.user = req.user.id; //guardo tambien el ide del usuario en la nota

  await newNote.save();

  //mensaje acuando se crea la nota
  req.flash("success_msg", "Nota creada exitosamente"); //(categoira, mensaje)

  //luego de guardar la nueva nota, mostramos todas
  res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .lean(); //validacion de pertenencia de notas por usuario
  res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditFomr = async (req, res) => {
  //formario de edicion

  // luego guardo los datos de mi nota con la ID
  const notasEd = await Note.findById(req.params.id);

  const mensaje = {
    id: notasEd._id,
    titulo: notasEd.titulo,
    description: notasEd.description,
    user: notasEd.user,
  };
  
  if (req.user.id != mensaje.user) {
    req.flash("error_msg", "No estas autorizado");
    return res.redirect("/notes");
  }
  res.render("notes/edit-notes", { mensaje });
};

notesCtrl.updateNotes = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    titulo: title,
    description: description,
  }); //ide del mensaje.id
  //Mensaje
  req.flash("success_msg", "Nota actualizada  exitosamente");
  res.redirect("/notes");
};
notesCtrl.deleteNotes = async (req, res) => {
  // obtengo el id y lo elimino
  await Note.findByIdAndDelete(req.params.id);
  //mensaje
  req.flash("success_msg", "Nota eliminada exitosamente");
  //despues que borramos la nota nos redirigimos de nuevo a la pg
  res.redirect("/notes");
};
module.exports = notesCtrl;
