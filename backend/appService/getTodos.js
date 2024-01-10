const { Todo, User } = require("../db");

const getTodos = async (req, res) => {
  const userId = req.userId;
  const todos = await Todo.find({ user: userId });
  res.status(200).json({ todos });
};

module.exports = {
  getTodos,
};
