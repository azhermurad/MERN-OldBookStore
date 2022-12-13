const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
    createUser,
    userLogin,
    userProfile,
    updateUserPfofile,
} = require('../controllers/userController');
const User = require('../models/User');
const {
    addUserValidation,
    LoginUserValidation,
    userProfileUpdateValidation,
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

// @desc user profile update
// @router Put /api/user/profile
// @access Private

router.put(
    '/api/user/profile',
    auth,
    userProfileUpdateValidation,
    updateUserPfofile
);

module.exports = router;
