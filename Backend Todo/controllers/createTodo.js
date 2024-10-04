//import from model
const Todo=require("../models/Todo")

//define route handler

exports.createTodo=async(req,res)=>{
    try{
        //extract title and description from request body
        const {title,description}=req.body;

        //create or insert a new Todo Obj and insert in DB
        const response=await Todo.create({title,description});

        //3 send a json response with a success flag

        // if(response){
            

     return res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:"Entry Created Successfully"
    
                }
            )
        // }
        // console.log("laaadsifh");
        // return res.status(200).json(

        //     {
        //         msg:"will this work"
        //     }
        // )

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal Server Error",
            message:err.message,
            //500 for internal error
        })

    }
}