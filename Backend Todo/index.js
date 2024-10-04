
const express=require('express');
const app=express();

//try that config load from env file 

require("dotenv").config();

//By default port is 4000
const PORT=process.env.PORT ||4000;

// middleware to parse json request body or parse the controller OR body mey se parse krna 

app.use(express.json());

//routes import is neccessary for TODO API

const todoRoutes=require("./routes/Todos");

//mount OR ADD the todo API routes
app.use("/api/v1",todoRoutes);

//start server

//connect to the database
const dbConnect=require("./config/database");
dbConnect();

//default Route
app.get("/",(req,res)=>{
    res.send(`<h1>This is HomePage </h1> `)
})

app.listen(PORT,()=>{
    console.log(`Server started successfully at ${PORT}`)
})









// app.listen(3000,()=>{
//     console.log("App is running Successfuly")
// })

// app.get('/',(req,res)=>{
   
//     res.send("i am on 3000 port")}
// )