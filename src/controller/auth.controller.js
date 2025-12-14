const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//-----------Registration--------------------//
async function registerController(req,res) {
    
    const {username,email,password} = req.body;
    console.log("User registered by registerController");

    const isUserExist = await userModel.findOne({username});

    if(isUserExist){
        return res.status(400).json({
            message:"user already exists"
        })
    };

    const user = await userModel.create({
        username,email,password:await bcrypt.hash(password,10)
    });

    const token = jwt.sign({id:user._id},process.env.JWT_URI)

    res.cookie("token",token);

    return res.status(201).json({
        message:"User registered Successfully",
        token
    })
    
};

//------------Login----------------------//
async function loginController(req,res){
    const {username,password} = req.body
    console.log("this by loginController");

    const user = await userModel.findOne({username});

    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    };

    const validPass = await bcrypt.compare(password,user.password);

    if(!validPass){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_URI)

    res.cookie("token",token);

     return res.status(201).json({ 
        message:"user Logged in succesfully",
        user: {
            username:user.username,
            id:user._id
        }
    });
};

//----------Profile------------------------
async function profileController(req,res){
    return res.status(200).json({
    message: "Profile fetched successfully",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
}

module.exports = {
    registerController,
    loginController,
    profileController
};