const { User } = require("../db");

const logout = async (req, res) => {
  // const refreshAccesToken = cookieParser;
  // const user = await User.findOne({ refreshToken:  })
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie.jwt;

  await User.findOneAndUpdate(
    { refreshToken },
    {
      $unset: { refreshToken },
    }
  );

  res.clearCookie("jwt", { httpOnly: true, secure: true });
  return res.sendStatus(204);
};

module.exports = {
  logout,
};
