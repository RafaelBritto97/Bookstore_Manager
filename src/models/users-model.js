const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const users = [
  { id: "1", name: "Rafael", email: "rafael@gmail.com", password: "123456" },
  { id: "2", name: "Joao", email: "joao@gmail.com", password: "666555" },
];

module.exports = {
  getAllUsers: () => users,

  getUserById: (id) => users.find((user) => user.id === id),

  getUserByEmail: (email) => users.find((user) => user.email === email),

  createUser: (name, email, password) => {
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
      return "Dados Inválidos";

    const newUser = {
      id: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    };

    users.push(newUser);
    return newUser;
  },
};
