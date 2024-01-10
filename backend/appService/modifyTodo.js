const { updateTodo } = require("../types");
const { Todo, User } = require("../db");

const completeTodo = async (req, res) => {
  const updatePayload = req.body;
  const parsedPayLoad = updateTodo.safeParse(updatePayload);
  if (!parsedPayLoad.success) {
    res.status(411).json({
      message: "You sent the wrong inputs",
    });
    return;
  }

  const documentsUpdated = await Todo.updateOne(
    {
      _id: parsedPayLoad.data.id,
      user: req.userId,
    },
    {
      $set: { completed: true },
    }
  );
  if (documentsUpdated.modifiedCount === 1) {
    return res.status(200).json({
      message: `Todo marked as completed`,
    });
  } else {
    return res.sendStatus(403);
  }
};

module.exports = {
  completeTodo,
};
