const express=require('express');
const fileupload=require("express-fileupload");
const app=express();




require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware

app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'}
));




//connect db
const connectWithDb = require("./config/Database");
connectWithDb();

//cloud se connect krna
const cloudinary=require("./Config/Cloudnary");
cloudinary.cloudinaryConnect();


//mounting
const route=require("./Routes/fileUpload");

app.use('/api/v1/upload',route);

app.listen(PORT, () => {
  
    console.log("app is running on 4000 port");
  }) ;
  
  app.get('/',(req,res)=>{
      res.send(`<h1>this is my home page</h1>`);
  })
