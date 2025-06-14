const User = require('../models/User')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startWith('Bearer')) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Token failed', errror: error.message })
    }
}

module.exports = { protect }