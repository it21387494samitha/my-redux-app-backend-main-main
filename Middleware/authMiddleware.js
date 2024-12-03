import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ error: 'Unauthorized dude' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const requireAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  