const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../types");
const { User } = require("../db");

const login = async (req, res) => {
  const userPayload = req.body;
  const userData = user.safeParse(userPayload);
  if (!userData.success) {
    res.status(411).json({
      msg: "invalid input",
    });
    return;
  }

  const foundUser = await User.findOne({
    username: userData.data.username,
  });

  if (!foundUser) {
    res.status(403).json({
      msg: "user not found",
    });
    return;
  }
  const match = await bcrypt.compare(
    userData.data.password,
    foundUser.password
  );
  if (!match) {
    res.status(403).json({
      msg: "invalid user credentials",
    });
    return;
  }

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  foundUser.$set({ refreshToken: refreshToken });
  await foundUser.save();

  res.cookie("jwt", refreshToken, {
    // httpOnly: true,
    // sameSite: "none",
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    accessToken,
  });
};

module.exports = {
    login
}