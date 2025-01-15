const usersModel = require("../models/users-model");

module.exports = {
  //GET /api/users
  index: (req, res) => {
    const users = usersModel.getAllUsers();
    res.status(200).json(users);
  },

  //GET /api/users/:id
  select: (req, res) => {
    const { id } = req.params;
    const user = usersModel.getUserById(id);
    res.status(200).json(user);
  },
};
