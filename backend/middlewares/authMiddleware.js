const User = require('../models/User')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    try {
        console.log("Headers received:", req.headers);

        let token = req.headers.authorization;

        if (token && token.startsWith('Bearer')) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            return next();
        } else {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token failed', error: error.message })
    }
}

module.exports = { protect }