//import models

const User = require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

// const bcrypt=require("bcrypt");
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;
    // req.body.lavish = "there is nothing , i just crack";
    // console.log( lavish )

    //check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists!",
      });
    }

    //secure password

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password,10);
      
    } catch (err) {
        console.error(err);
      return res.status(500).json({
          success:false,
          message:"Error in hassing Password",
      })
    }

    //create entry for User
    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, Please try again later!",
    });
  }
};

//NOW FOR LOGIN WRITE CONTROLLER

exports.login = async (req, res) => {
  try {
    //data fetch
    let {email,password}=req.body; 
    // console.log(email); 

    //validation on email and password
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please fill all the details carefully",
        })
    }
    //check user is DB or not or check for registered user
    let user=await User.findOne({email});
    //if user is not present in the DB
    if(!user){
    res.status(401).json({
        success:false,
        message:"User is not Present! Please first signup then try to Login!"
    })
  }

    //create payload for the JWT
    const payload={
      email:user.email,
      id:user._id,
      role:user.role,
    }
    

    //verify password & generate a JWT token
    
    if(bcrypt.compare(password,user.password)){
      let token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h",
      });
      // console.log(user);
      user=user.toObject();
      // console.log(user);
      user.token=token;
      user.password=undefined;

    
    
    // if(user.comparePassword(password)){

    //     let token = user.jwtToken();
        
    //     user.token=token;
    //     user.password=undefined;

        //create options for the cookie . Valid for 3 days
        const options={
          expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly:true, //means client side pr use nahi ho skti
        }

        //create a cookie
        return res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"User Logged in Successfully",
        })

      
      }
    else{
        //password do not match
        
        return res.status(403).json({
          
          
            success:false,
            message:"Password Is not Matched! OR Incorrect Password!"
        })
    }

  }
  catch(error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Login Failure!"
    })


   }
};
