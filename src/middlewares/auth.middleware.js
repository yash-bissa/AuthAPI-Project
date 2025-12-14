const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authMiddleware(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"Unauthoraised access , please login first and try again"
        });
    };

    try{
        const decoded = jwt.verify(token,process.env.JWT_URI);

        const user = await userModel.findOne({
            _id:decoded.id
        })

        req.user = user;

        next();
    }catch(err){
        return res.status(400).json({
             message:"Unauthoraised access , please login first and try again"
        })
    }
};

module.exports = authMiddleware;