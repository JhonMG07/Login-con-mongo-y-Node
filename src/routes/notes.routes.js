const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditFomr,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes.controllers"); //imporatar mis rutas de notas

const { isAuthenticated } = require("../helpers/auth"); //importar mi middlewar para verificar si un usuario tiene acceso a una ruta
// Notas nuevas

router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

//obtener todas las notas

router.get("/notes", isAuthenticated, renderNotes);

// Editar notas

router.get("/notes/edit/:id", isAuthenticated, renderEditFomr);

router.put("/notes/edit/:id", isAuthenticated, updateNotes); // se puede usar el metodo put

// eliminar notas

router.delete("/notes/delete/:id", deleteNotes);

//
module.exports = router;
