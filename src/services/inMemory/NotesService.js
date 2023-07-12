const { nanoid } = require('nanoid');

class NotesService {
  constructor() {
    this.notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updateAt,
    };

    this.notes.push(newNote);
    const isSuccess = this.notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this.notes;
  }

  getNotesById(id) {
    const note = this.notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this.notes.filter((n) => n.id === id)[0];

    if (index === -1) {
      throw new Error('Gagal memperbaharui catatan. Id tidak ditemukan');
    }
    const updateAt = new Date().toISOString();

    this.notes[index] = {
      ...this.notes[index],
      title,
      tags,
      body,
      id,
      updateAt,
    };
  }

  deleteNoteById(id) {
    const index = this.notes.filter((n) => n.id === id)[0];

    if (index === -1) {
      throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
    }

    this.notes.splice(index, 1);
  }
}

module.export = NotesService;
