const express=require('express');
const app=express();

const cookieParser = require('cookie-parser');


require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cookieParser());
app.use(express.json());  // for body parser from the body of the reqest (postman)

//connect db
const connectWithDb = require("./config/database");
connectWithDb();
//mounting
const route=require("./Routes/user");
app.use('/api/v1',route);

app.listen(PORT, () => {
  
    console.log("app is running on 4000 port");
  });
  
  app.get('/',(req,res)=>{
      res.send(`<h1>this is my home page</h1>`);
  })
