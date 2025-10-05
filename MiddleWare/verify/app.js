const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = async(req,res,next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
    }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.email; 
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = { verify }