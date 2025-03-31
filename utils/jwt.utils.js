const jwt = require('jsonwebtoken');
const config = require('../config/jwt-config');
const generateAccessToken = (user) => {
return jwt.sign(
{ id: user.id, email: user.email },
config.JWT_SECRET,
{ expiresIn: config.ACCESS_TOKEN_EXPIRY }
);
};
const verifyToken = (token) => {
return jwt.verify(token, config.JWT_SECRET);
};
module.exports = {
generateAccessToken,
verifyToken
};