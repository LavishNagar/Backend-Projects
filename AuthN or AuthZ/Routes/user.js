const express=require('express');
const router=express.Router();
const User=require('../models/userModel')



// import controller
const {signup}=require('../Controllers/AuthController');
const {login}=require('../Controllers/AuthController');

const {auth,isStudent,isAdmin}=require('../middleware/auth');


//create mapping

router.post('/login',login);
router.post('/signup',signup);


router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the AUTHentication route"
    })
})
//write Protected Route
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for Students'
    })
})

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for Admin'
    })
})


router.get('/getEmail',auth,async (req,res)=>{
    try{
        const id=req.user.id;
        // console.log(req.user.id);
        const user=await User.findById(id);
        console.log(user);

        res.status(200).json({
            success:true,
            user:user,
            message:'welcome to the email route',
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Code is not working"
        })
    }
})


module.exports=router;

