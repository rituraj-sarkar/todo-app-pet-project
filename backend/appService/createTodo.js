const { createTodo } = require("../types");
const { Todo, User } = require("../db");

const createTodoEntry = async (req, res) => {
  const createPayload = req.body;
  const parsedPayLoad = createTodo.safeParse(createPayload);
  if (!parsedPayLoad.success) {
    res.status(411).json({
      message: "You sent the wrong inputs",
    });
    return;
  }
  const userId = req.userId;

  await Todo.create({
    user: userId,
    title: parsedPayLoad.data.title,
    description: parsedPayLoad.data.description,
    completed: false,
  });

  res.status(200).json({
    message: `Todo created`,
  });
};

module.exports = {
  createTodoEntry
}