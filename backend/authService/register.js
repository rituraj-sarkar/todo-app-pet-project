const bcrypt = require("bcrypt");
const { user } = require("../types");
const { User } = require("../db");

const register = async (req, res) => {
  const userPayload = req.body;
  const userData = user.safeParse(userPayload);
  if (!userData.success) {
    res.status(411).json({
      msg: "invalid input",
    });
    return;
  }

  const existingUser = await User.findOne({
    username: userData.data.username,
  });

  if (existingUser) {
    res.status(403).json({
      msg: "user already registered",
    });
    return;
  }

  await User.create({
    username: userData.data.username,
    password: bcrypt.hashSync(userData.data.password, 10),
  });

  res.status(200).json({
    message: `User created`,
  });
};

module.exports = {
    register
}