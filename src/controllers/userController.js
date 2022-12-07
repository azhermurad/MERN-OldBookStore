const { validationResult } = require('express-validator');
const User = require('../models/User');

// @desc create user
// @router Get /api/user/signup
// @access Public

const createUser = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Error',
                message: errors.array()[0].msg,
                data: null,
            });
        }
        const user = new User(req.body);
        await user.save();
        const token = await user.generateToken();
        res.status(200).json({  
            status: 'Success',
            message: 'User successfully Created',
            data: { user, token },
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
};

// @desc login user
// @router Get /api/user/login
// @access Public
const userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'Error',
            message: errors.array()[0].msg,
            data: null,
        });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(res, email, password);
        if (user) {
            const token = await user.generateToken();
            res.status(200).json({
                status: 'Success',
                message: 'User successfully login',
                data: { user, token },
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
};

// @desc user profile
// @router Get /api/user/profile
// @access private

const userProfile = async (req, res) => {
    try {
      
        const user = await User.findById(req.user._id);
        res.status(200).json({  
            status: 'Success',
            message: 'User successfully Created',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
};
module.exports = { createUser, userLogin, userProfile };
