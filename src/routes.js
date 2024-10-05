const {
  addNoteHandler,
  getAllNotesHandler,
  editNoteByIdHandler,
  getNoteHandlerbyId,
  deleteNotebyIdHandler
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteHandlerbyId,
  },
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },

  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNotebyIdHandler,
  },
];

module.exports = routes;
