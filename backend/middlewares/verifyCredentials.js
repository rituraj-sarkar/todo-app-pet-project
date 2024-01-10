const jwt = require("jsonwebtoken");
const { User } = require("../db");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(403).json({
      msg: "mandatory header missing",
    });
    return;
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // req.user = decoded.username;
    const foundUser = await User.findOne({ username: decoded.username });
    if (!foundUser)
      return res.sendStatus(403).json({ message: "user does not exist" });
    req.userId = foundUser._id;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};

module.exports = {
  verifyJwt: verifyJwt,
};
