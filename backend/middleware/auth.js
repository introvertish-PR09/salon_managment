const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const requireRole = role => (req, res, next) => {
  if (!req.user || req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { requireAuth, requireRole };
