const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updateAt,
  };

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  }).code(500);
};

const getAllNotesHandler = (_, h) => h.response({
  status: 'success',
  data: {
    notes,
  },
}).code(200);

const getNotedByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return h.response({
      status: 'success',
      data: {
        note,
      },
    }).code(200);
  }

  return h.response({
    status: 'fail',
    messange: 'Catatan tidak ditemukan',
  }).code(404);
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toDateString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    return h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Catatan gagal diperbaharui, perhatikan id anda',
  }).code(404);
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex(((note) => note.id === id));

  if (index !== -1) {
    notes.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus',
  }).code(404);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNotedByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
