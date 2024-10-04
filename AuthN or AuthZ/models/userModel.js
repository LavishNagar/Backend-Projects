const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const mongoose =require("mongoose");

const userSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin", "Student" , "Visitor"]
    },

}
);


// userSchema.methods.comparePassword = function (){
//     return bcrypt.compare(password,this.password)
// }

// userSchema.methods.jwtToken = function(){
//     const payload={
//         email:this.email,
//         id:this._id,
//         role:this.role,
//       }

//     return jwt.sign(payload,process.env.JWT_SECRET,{
//         expiresIn:"2h"
//       })
// }

//this users name is used to create a folder in the mongoDB database
module.exports=mongoose.model("users",userSchema);