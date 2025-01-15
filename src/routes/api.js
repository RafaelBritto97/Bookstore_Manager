const express = require("express");
const booksController = require("../controllers/books-controller");
const loansController = require("../controllers/loans-controller");
const { ensureAuth } = require("../middlewares/auth-middleware");
const usersController = require("../controllers/users-controller");
const apiRouter = express.Router();

apiRouter.get("/users", usersController.index);
apiRouter.get("/users/:id", usersController.select);

apiRouter.get("/books", booksController.index);
apiRouter.get("/books/:id", booksController.select);
apiRouter.post("/books", booksController.create);
apiRouter.put("/books/:id", booksController.update);
apiRouter.delete("/books/:id", booksController.delete);

apiRouter.get("/loans", loansController.index);
apiRouter.get("/loans/:id", loansController.select);
apiRouter.post("/loans", ensureAuth, loansController.create);
apiRouter.post("/loans/:id/return", loansController.return);

module.exports = apiRouter;
