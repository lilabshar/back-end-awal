const { addNoteHandler, getAllNotesHandler, getNotedByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: './notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: './notes/{id}',
    handler: getNotedByIdHandler,
  },
];

module.exports = routes;
