const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
    createUser,
    userLogin,
    userProfile,
} = require('../controllers/userController');
const User = require('../models/User');
const {
    addUserValidation,
    LoginUserValidation,
} = require('../utill/validataion/userValidation');

const router = express.Router();

// @desc create user
// @router Get /api/user/signup
// @access Public
router.post('/api/user/signup', addUserValidation, createUser);

// @desc login user
// @router Get /api/user/login
// @access Public
router.post('/api/user/login', LoginUserValidation, userLogin);

// @desc user profile
// @router Get /api/user/profile
// @access private
router.get('/api/user/profile', auth, userProfile);

// get all users from database
router.get('/api/user', async (req, res) => {
    try {
        const user = await User.find({});
        res.send({ user });
    } catch (error) {}
});

module.exports = router;
