class NotesHandler {
  constructor(service) {
    this.service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNoteHandler = this.getNoteHandler.bind(this);
    this.getNoteByHandler = this.getNoteByHandler.bind(this);
    this.putNoteByHandler = this.putNoteByHandler.bind(this);
    this.deleteNoteByHandler = this.deleteNoteByHandler.bind(this);
  }

  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload;

      const noteId = this.service.addNote({ title, body, tags });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      }).code(200);
      return response;
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }

  getNoteHandler() {
    const notes = this.service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const notes = this.service.getNoteById(id);
      return {
        status: 'success',
        data: {
          notes,
        },
      };
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(404);
    }
  }

  putNotebyIdHandler(request, h) {
    try {
      const { id } = request.params;
      this.service.editNodeById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  delteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this.service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      return h.response({
        status: 'success',
        message: error.message,
      }).code(404);
    }
  }
}

module.exports = NotesHandler;
