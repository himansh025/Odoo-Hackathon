const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log(authHeader)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
console.log(token)
try {
  console.log("Verifying token...",process.env.JWT_SECRET);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded JWT:", decoded);
  req.user = await User.findById(decoded.id).select('-password');
  next();
} catch (err) {
  console.error("JWT verification failed:", err); // Log full error
  return res.status(401).json({ message: 'Invalid token' });
}} else {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
};

// Role-based middleware
exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
