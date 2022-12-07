const { check } = require('express-validator');
const User = require('../../models/User');

const addUserValidation = [
    check('name').trim().not().isEmpty().withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('please provide a valid email address')
        .custom((value) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
    check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password must be 5+ chars long'),
];

const LoginUserValidation = [
    check('email')
        .isEmail()
        .withMessage('please provide a valid email address'),
    check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password must be 5+ chars long'),
];

module.exports = {
    addUserValidation,
    LoginUserValidation
};
