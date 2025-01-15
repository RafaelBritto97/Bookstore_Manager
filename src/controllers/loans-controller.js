const HttpError = require("../errors/HttpError");
const booksModel = require("../models/books-model");
const loansModel = require("../models/loans-model");

module.exports = {
  //GET /api/loans
  index: (req, res) => {
    const loans = loansModel.getAllLoans();
    res.status(200).json(loans);
  },

  //GET /api/loans/:id
  select: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.getLoanById(id);

    if (!loan) throw new HttpError(404, "Loan not found");

    res.status(200).json(loan);
  },

  //POST /api/loans
  create: (req, res) => {
    const user = req.user;
    const { bookId } = req.body;

    if (typeof bookId !== "string") throw new HttpError(404, "Invalid Book ID");

    const book = booksModel.getBookById(bookId);
    if (!book) throw new HttpError(404, "Book not found");

    const newLoan = loansModel.createLoan(user, book);
    res.status(201).json(newLoan);
  },
  //POST /api/loans/:id/return
  return: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.returnLoan(id);

    res.status(200).json(loan);
  },
};
