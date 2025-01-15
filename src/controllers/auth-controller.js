const jwt = require("jsonwebtoken");
const usersModel = require("../models/users-model");
const bcrypt = require("bcrypt");

module.exports = {
  //POST /register
  register: (req, res) => {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({ message: "Fields must be strings" });
    }

    const existingUser = usersModel.getUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: "E-mail already in use" });
    }

    const newUser = usersModel.createUser(name, email, password);
    res.status(201).json({ ...newUser, password: undefined });
  },

  //POST /login
  login: (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Invalid fields" });
    }

    const user = usersModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });

    res.json({ token });
  },
};
