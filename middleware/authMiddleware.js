// middleware/authMiddleware.js

// Middleware to verify JWT token and attach user to request object

const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); // User model

const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: 'Invalid token.' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
