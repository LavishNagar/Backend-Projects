
const mongoose=require('mongoose');

require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })

.then(()=>{
    console.log("DB is working Successfull");
}).catch((error)=>{
    console.log("Issue in DB Connection");
    console.error(error.message);
    process.exit(1);//process.exit()--> for terminate the node js process

    // process.exit(1): This line terminates the process with an exit code of 1, indicating that an error occurred. This is often used to signal to the operating system or any scripts running the Node.js application that the process failed due to some error
})

}
module.exports=dbConnect;