const jwt = require('jsonwebtoken');
const config = require('../config/jwt-config');
const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
if (!token) {
return res.status(401).json({ message: 'Access token is required' });
}
try {
const decoded = jwt.verify(token, config.JWT_SECRET);
req.user = decoded;
next();
} catch (error) {
return res.status(403).json({ message: 'Invalid or expired token' });
}
};
module.exports = {
authenticateToken
};
