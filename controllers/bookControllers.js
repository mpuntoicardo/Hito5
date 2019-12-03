/* eslint-disable consistent-return */

const Book = require('../models/book');


function getBooks(req, res) {
  Book.find({}, (error, users) => {
    if (error) return res.status(500).send({ error });
    return res.status(200).send(users);
  });
}
// by id
function getBook(req, res) {
  const { bookId } = req.params;

  Book.findById({ bookId }, (error, book) => {
    if (error) return res.status(404).send({ message: 'No books found', error });
    return res.status(200).send(book);
  });
}
// by titulo
function getBookTitulo(req, res) {
  const { titulo } = req.body;
  Book.findOne({ titulo }, (error, book) => {
    if (error) return res.status(404).send({ message: 'No book found', error });
    return res.status(200).send({ book });
  });
}
// by ISBN
function getBookISBN(req, res) {
  const { ISBN } = req.body;
  Book.findOne({ ISBN }, (error, book) => {
    if (error) return res.status(404).send({ message: 'No book found', error });
    return res.status(200).send({ book });
  });
}
// by autor
function getBookAutor(req, res) {
  const { autor } = req.body;
  Book.findOne({ autor }, (error, book) => {
    if (error) return res.status(404).send({ message: 'No book found', error });
    return res.status(200).send({ book });
  });
}
// by precio
function getBookPrecio(req, res) {
  const { precio } = req.body;
  Book.find({ precio }, (error, book) => {
    if (error) return res.status(404).send({ message: 'No book found', error });
    return res.status(200).send({ book });
  });
}
// By editorial
function getBookEditorial(req, res) {
  const { editorial } = req.body;
  Book.find({ editorial }, (error, book) => {
    if (error) return res.status(404).send({ message: 'No book found', error });
    return res.status(200).send({ book });
  });
}
// Create book nad saving it
function createBook(req, res) {
  const book = new Book(req.body);
  book.save((error, newBook) => {
    if (error) return res.status(400).send({ message: 'Error saving book', error });
    return res.status(200).send({ message: 'Saved book', newBook });
  });
}
// Replace book info
function replaceBook(req, res) {
  const { bookId } = req.params;
  const { titulo } = req.body;
  const { ISBN } = req.body;
  const { descripcion } = req.body;
  const { autor } = req.body;
  const { precio } = req.body;
  const { editorial } = req.body;
  if (!titulo || !descripcion || !autor || !ISBN || !precio || !editorial) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Create new book
  const bookReplacement = req.body;
  Book.findById(bookId, (err, book) => {
    if (err) return res.status(404).send({ message: 'No book to replace found', err });
    // Replace book
    book.replaceOne(bookReplacement, (error) => {
      if (error) return res.status(500).send({ error });
      return res.status(200).send({ message: 'Book replaced' });
    });
  });
}
// delete book
function deleteBook(req, res) {
  const { bookId } = req.params;
  Book.findByIdAndRemove(bookId, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'Book not found ' });
    return res.status(200).send({ message: 'Book deleted' });
  });
}
// Edit book
function editBook(req, res) {
  const { bookId } = req.params;
  Book.findByIdAndUpdate(bookId, req.body, { new: true }, (error, user) => {
    if (error) return res.status(500).send({ error });

    return res.status(200).send({ message: 'Book updated', user });
  });
}
module.exports = {
  getBooks,
  getBook,
  getBookTitulo,
  getBookISBN,
  getBookAutor,
  getBookPrecio,
  getBookEditorial,
  createBook,
  replaceBook,
  deleteBook,
  editBook,
};
