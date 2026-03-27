const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Keep shape consistent with createTask expectation
        req.user = { userId: decoded.userId };
        console.log('Authenticated user ID:', req.user.userId); // Debug log to check decoded user ID
        next();
    } catch (error) {
        console.error('Auth middleware error', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;