const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: Number
    // required: true
  },
  executionDate: {
    type: Date,
    required: true
  },
  activeNote: {
    type: Boolean,
    default: true
  },
  finishedTask: {
    type: Boolean,
    default: false
  },
  finishedDate: {
    type: String
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  }
});

module.exports = Note = mongoose.model('notes', NoteSchema);
