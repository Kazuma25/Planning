const jwt = require("jsonwebtoken");
const config = require("../config/jwt-config");
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, "test", {
    expiresIn: "1h",
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, "test");
};
module.exports = {
  generateAccessToken,
  verifyToken,
};
