const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../types");
const { User } = require("../db");

const refresh = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt)
    return res.status(403).json({ message: "No token found" });
  const refreshAccesToken = cookie.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshAccesToken });

  jwt.verify(
    refreshAccesToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err || foundUser.username !== decoded.username)
        return res.status(403).json({ msg: "refresh token expired" });

      const refreshedToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );
      return res.json({ accessToken: refreshedToken });
    }
  );
};

module.exports = {
  refresh,
};
