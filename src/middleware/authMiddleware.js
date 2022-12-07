const User = require("../models/User");
const jwt = require("jsonwebtoken")

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,"secretkey"); 
        const user = await User.findOne({_id: decoded._id})
        if(!user){
            throw new Error();
        };
        req.user= user;
        next();
    } catch (error) {
        console.log(error)
       return res.status(401).json({
        status: 'Error',
        message: "Authenticate fail",
        data: null,
    });
    };
   
    
}

module.exports = authMiddleware