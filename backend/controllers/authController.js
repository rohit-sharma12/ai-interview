const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        //check if user alerady exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ messsage: 'User already exists' })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        })

        //return user data with jwt
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ messsage: 'Server error', error: error.messsage })
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ messsage: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({ messsage: 'Invalid email or password' })
        }

        //return user data with jwt
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ messsage: 'Server error', error: error.messsage })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user);
    } catch (error) {
        return res.status(400).json({ message: 'Server error', error: error.message })
    }
}


module.exports = { registerUser, loginUser, getUserProfile };