const express =require("express");
const router=express.Router();

//import controller
const {likePost,unlikePost}=require("../controllers/LikeController");
const {createComment}=require("../controllers/CommentController");
const {createPost,getAllPosts}=require("../controllers/PostController");


//Mapping Create


router.post('/comments/create',createComment);
router.post('/posts/create',createPost);
router.get('/posts',getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);





//export
module.exports=router;