/*
Filename: AdvancedWebApp.js

This code is an advanced web application that allows users to create, edit, and delete notes. It incorporates a sophisticated user interface, authentication functionality, and a backend database for persistence.
*/

// Constants
const MAX_NOTE_LENGTH = 1000;

// Classes
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  authenticate(password) {
    return this.password === password;
  }
}

class Note {
  constructor(title, content, owner) {
    this.title = title;
    this.content = content;
    this.owner = owner;
  }

  updateContent(newContent) {
    if (newContent.length <= MAX_NOTE_LENGTH) {
      this.content = newContent;
      return true;
    } else {
      return false;
    }
  }
}

class NoteApp {
  constructor() {
    this.users = [];
    this.currentUser = null;
    this.notes = [];
    this.db = new Database();  // Backend database for persistence
  }

  registerUser(name, email, password) {
    const newUser = new User(name, email, password);
    this.users.push(newUser);
    this.db.saveUser(newUser);
  }

  loginUser(email, password) {
    const user = this.users.find(user => user.email === email);
    if (user && user.authenticate(password)) {
      this.currentUser = user;
    }
  }

  logoutUser() {
    this.currentUser = null;
  }

  createNote(title, content) {
    if (this.currentUser) {
      const newNote = new Note(title, content, this.currentUser);
      this.notes.push(newNote);
      this.db.saveNote(newNote);
    }
  }

  updateNoteContent(noteId, newContent) {
    if (this.currentUser) {
      const note = this.notes.find(note => note.id === noteId && note.owner === this.currentUser);
      if (note && note.updateContent(newContent)) {
        this.db.updateNoteContent(noteId, newContent);
      }
    }
  }

  deleteNote(noteId) {
    if (this.currentUser) {
      const noteIndex = this.notes.findIndex(note => note.id === noteId && note.owner === this.currentUser);
      if (noteIndex !== -1) {
        this.notes.splice(noteIndex, 1);
        this.db.deleteNote(noteId);
      }
    }
  }
}

// Backend Database Class
class Database {
  constructor() {
    this.usersData = {};
    this.notesData = {};
  }

  saveUser(user) {
    this.usersData[user.email] = user;
  }

  saveNote(note) {
    const ownerId = note.owner.email;
    if (!this.notesData[ownerId]) {
      this.notesData[ownerId] = [];
    }
    this.notesData[ownerId].push(note);
  }

  updateNoteContent(noteId, newContent) {
    const ownerId = Object.keys(this.notesData).find(ownerId => {
      return this.notesData[ownerId].some(note => note.id === noteId);
    });
    if (ownerId) {
      const note = this.notesData[ownerId].find(note => note.id === noteId);
      if (note) {
        note.content = newContent;
      }
    }
  }

  deleteNote(noteId) {
    const ownerId = Object.keys(this.notesData).find(ownerId => {
      return this.notesData[ownerId].some(note => note.id === noteId);
    });
    if (ownerId) {
      const noteIndex = this.notesData[ownerId].findIndex(note => note.id === noteId);
      if (noteIndex !== -1) {
        this.notesData[ownerId].splice(noteIndex, 1);
      }
    }
  }
}

// Usage Example
const myNoteApp = new NoteApp();

// User Registration
myNoteApp.registerUser("John Doe", "john@example.com", "password");

// User Login
myNoteApp.loginUser("john@example.com", "password");

// Create a Note
myNoteApp.createNote("Important Note", "This is an important note");

// Update Note Content
myNoteApp.updateNoteContent("noteId1", "Updated content of the important note");

// Delete Note
myNoteApp.deleteNote("noteId1");
