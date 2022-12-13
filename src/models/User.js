const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
// hash password before save it
userSchema.pre('save', async function () {
    const user = this;
    if (user.isModified('password')){
        console.log("password is change")
        user.password = await bcrypt.hash(user.password, 10);
    }
});

userSchema.methods.isUserExist = async function () {
    const user = await User.findOne({ email: this.email });
    return user;
};
// @desc generate jwt token for user auth
userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, 'secretkey', { expiresIn: '1h' });
    return token;
};
userSchema.statics.findByCredentials = async (res, email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400).json({
            status: 'Error',
            message: 'No User exist by this email',
            data: null,
        });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({
            status: 'Error',
            message: 'Invalid password',
            data: null,
        });
        return;
    }

    return user;
};

const User = model('User', userSchema);
module.exports = User;
