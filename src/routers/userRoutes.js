const express = require('express');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminRole');
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
    EditUserByAdmin,
} = require('../utill/validataion/userValidation');
const { validationResult } = require('express-validator');

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

// @desc user profile update
// @router Put /api/user/profile
// @access Private

router.put(
    '/api/user/profile',
    auth,
    userProfileUpdateValidation,
    updateUserPfofile
);
// to handle the admmin role in the apis

// get all users from database
router.get('/api/user', auth, admin, async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({
            status: 'Success',
            message: 'All User Show',
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
});

// delete user
router.delete('/api/user/:id', auth, admin, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                status: 'Error',
                message: 'User Not Found',
                data: null,
            });
            return;
        }
        await user.remove();
        res.status(200).json({
            status: 'Success',
            message: 'User Deleted',
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
});

const updatUserByAdmin = async (req, res) => {
    const {id} = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'Error',
            message: errors.array()[0].msg,
            data: null,
        });
    }
    try {
        const { name, email,isAdmin } = req.body;
        console.log(name,email,isAdmin)
        const user = await User.findById(id).select("-password");
        user.name = name || user.name;
        user.email = email || user.email;
        user.isAdmin = isAdmin
        await user.save();
        console.log(user)

        res.status(200).json({
            status: 'Success',
            message: 'User Is Updated',
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


router.put(
    '/api/user/:id',
    auth,
    admin,
    updatUserByAdmin
);


// get single user by admin
router.get('/api/user/:id', auth, admin, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                status: 'Error',
                message: 'User Not Found',
                data: null,
            });
            return;
        }
        res.status(200).json({
            status: 'Success',
            message: "User Is Show!",
            data: user,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: 'SomeThing Went Wrong!',
            data: null,
        });
    }
});
module.exports = router;

