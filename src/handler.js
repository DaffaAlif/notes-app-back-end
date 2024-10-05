const { nanoid } = require("nanoid");

const notes = require("./notes");
const { message } = require("antd");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: `success`,
      message: `Catatan berhasil ditambahkan`,
      data: {
        noteId: id,
      },
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    message: `data gagal ditambahkan`,
    status: `fail`,
  });
  response.code(500);

  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteHandlerbyId = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id == id)[0];

  if (note !== undefined) {
    const response = h.response({
      status: "success",
      message: "data berhasil diambil",
      data: {
        note,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "data tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, body, tags } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      body,
      tags,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Data berhasil diupdate",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal diupdate, id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNotebyIdHandler = (request, h) => {
    const {id} = request.params

    const index = notes.findIndex((note) => note.id === id)
    
    if(index !== -1 ){
        notes.splice(index, 1)
        const response = h.response({
            status:'success',
            message:'data berhasil dihapus',
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status:'fail',
        message:'data tidak ditemukan',
    })
    response.code(404)
    return response
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  editNoteByIdHandler,
  getNoteHandlerbyId,
  deleteNotebyIdHandler
};
