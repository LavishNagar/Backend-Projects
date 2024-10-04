//import mongoose

const mongoose=require('mongoose');

//write route handler

//kis post pr comment kiya hai
//kis user ne comment kiya hai
//kua comment kiya hai

const commentSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post", //this is reference to post model
    },
    user:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }
});




//export
module.exports=mongoose.model("Comment",commentSchema)
//comment schema ko comment name se export kiya gya hai
