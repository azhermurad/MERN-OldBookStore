const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: 'Error',
            message: 'Authenticate fail',
            data: null,
        });
    }
};

module.exports = admin;
