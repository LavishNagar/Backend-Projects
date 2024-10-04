const express=require('express');
const router=express.Router();

const {localFileUpload,imageUpload,videoUpload,imageReduceUpload}=require("../Controller/fileUpload");

// console.log("this is route file")

// api route
router.post("/localFileUpload",localFileUpload);


router.post("/imageUpload",imageUpload);
router.post('/videoUpload',videoUpload);
router.post('/imageReduceUpload',imageReduceUpload)

module.exports=router;