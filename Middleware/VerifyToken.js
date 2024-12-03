import jwt from 'jsonwebtoken';
import UserModel from '../Models/UserModel.js';

export const VerifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      req.user = user; // Populate `req.user` with user data, including role
      next();
  } catch (err) {
      res.status(403).json({ message: 'Failed to authenticate token' });
  }
};


// In Middleware/VerifyRole.js
export const verifyRole = (roles) => (req, res, next) => {
  const { role } = req.user; // Ensure `req.user` has been populated by token verification middleware

  if (!roles.includes(role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
  next();
};


export default VerifyToken;
