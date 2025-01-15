const booksModel = require("../models/books-model");

module.exports = {
  //GET /api/books
  index: (req, res) => {
    const books = booksModel.getAllBooks();
    res.status(200).json(books);
  },

  //GET /api/books/:id
  select: (req, res) => {
    const { id } = req.params;
    const book = booksModel.getBookById(id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(201).json(book);
  },

  //POST /api/books
  create: (req, res) => {
    const { title, author, quantityAvailable } = req.body;

    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof quantityAvailable !== "number"
    ) {
      return res.status(400).json({ message: "Invalid fields" });
    }

    const newBook = booksModel.createBook(title, author, quantityAvailable);
    res.status(201).json(newBook);
  },

  //PUT /api/books/:id
  update: (req, res) => {
    const { id } = req.params;
    const { title, author, quantityAvailable } = req.body;
    const fieldsToUpdate = {};

    if (title) fieldsToUpdate.title = title;
    if (author) fieldsToUpdate.author = author;
    if (quantityAvailable) fieldsToUpdate.quantityAvailable = quantityAvailable;

    const updatedBook = booksModel.updateBook(id, fieldsToUpdate);

    res.status(200).json(updatedBook);
  },

  //DELETE /api/books/:id
  delete: (req, res) => {
    const { id } = req.params;
    const deletedBook = booksModel.deleteBook(id);
    res.status(200).json(deletedBook);
  },
};
