const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  titulo: { type: String, required: true },
  ISBN: { type: String, required: true },
  descripcion: { type: String, required: true },
  autor: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  precio: { type: String, required: true },
  editorial: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
