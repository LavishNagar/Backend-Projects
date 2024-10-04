const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//mounting
const blog = require("./routes/blog");
app.use("/api/v1",blog);

//connect db
const connectWithDb = require("./config/database");
connectWithDb();

app.listen(PORT, () => {
  
  console.log("app is running on 4000 port");
});

app.get('/',(req,res)=>{
    res.send(`<h1>this is my home page</h1>`);
})
