
// create three middleware
// authentication check,isStudent,isAdmin

const jwt=require('jsonwebtoken');
require("dotenv").config();// need for json web token

exports.auth=(req,res,next)=>{
    try{
        //extract jwt token from req.body,cookies& from header
        // let token=req.body.token;
        let token=req.cookies.token;
        // console.log(token);


        // authorizaioon value is Bearer space Token
        // let token=req.header("Authorization").replace("Bearer ","");
        // console.log("header:",req.header("Authorization") );

        if(!token){
            return res.status(401).json({
                success:false,
                message:'TOken Missing',

            })
        }
        //verify the token
        try{
            const payload =jwt.verify(token,process.env.JWT_SECRET);// token se data nikalna
            // console.log(payload);
            // payload.role="Student";
            // console.log(payload);

            req.user=payload;   //because fir hm req.user ka use krke name, pic, phone number kuch bhi nikal skte hai
            // console.log(req.user);

        }catch(error){
            console.log(error);
            return res.status(401).json({
                success:false,
                message:'Token is invalid!'
            })
        }
        next();

    }
    catch(error){
        return res.status(501).json({
            success:false,
            message:'someting went wrong when verifing the toekn'
        })

         
    }
}

exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role !="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students"
            })
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not Matching",
        })

    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role !="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route fo the Admin",
            })
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            status:false,
            message:"Admin Role is not matching",
        })
    }
}
