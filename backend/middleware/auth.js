const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, 'your-jwt-secret-key');
            const user = await User.findByPk(decoded.userId);
            if (user) {
                req.user = {
                    userId: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name
                };
            }
        } catch (error) {
            console.log('Token verification failed:', error.message);
        }
    }
    next();
};

const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

module.exports = {
    authenticateToken,
    requireAuth,
    requireAdmin
};