//import model
const Post=require("../models/postModel");
const Comment=require('../models/commentModel');

//business logic
exports.createComment=async(req,res)=>{
    try{
        //fetch data from req body
        const {post,user,body}=req.body;
        //create a comment object

        const comment=new Comment({
            post,user,body}
        );
        // console.log(comment);
        //save the new comment into the database
        const savedcomment=await comment.save();

        //find the post by ID, add the new comment to items comments-Array
        //push operator is used to update the DB
        //new:true used to return the updated document not previous
        //populate=> fetch documents by Id, or Id se details nikalni
        const updatedpost = await Post.findByIdAndUpdate(post,{$push:{comments:savedcomment._id}},{new:true}).populate("comments").exec();

        res.json({
            post:updatedpost,
          
        });

    }
    catch(error){
        console.error("Error:",error.message);
        return res.status(500).json({
            error:"Error While Creating Comment",
           
        });

    }
}