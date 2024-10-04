
require("dotenv").config();
const mongoose=require('mongoose');

const connectWithDb=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{console.log("DB connected Successfully")})
    .catch((error)=>{
        console.log("Db facing connection Issues");
        console.log(error);
        process.exit(1);
    })
}

module.exports=connectWithDb;