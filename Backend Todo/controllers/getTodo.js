const Todo=require("../models/Todo")


exports.getTodo=async(req,res)=>{
    try{
        //fetch all todo items from database
        //await is used bcz interct with DB
        const todos=await Todo.find({});

        //response
        res.status(200).json({
            success:true,
            data:todos,
            message:"Entire Todo Data is fetched"
        })

    }
    catch(err){
        console.error(err);
        console.status(500).json({
            success:false,
            error:err.message,
            message:"Error is Occur or Server error"
        })

    }

}

exports.getTodobyId=async (req,res)=>{

    try{
        const {id}=req.params;
        const todo=await Todo.findById({_id:id});


     //when data forgiven id not found
     if(!todo){
        return res.status(404).json({
            success:false,
            message:"No data found with given Id"

        })
     }
     //data for given id FOUND
     res.status(200).json({
        success:true,
        data:todo,
        message:`Todo ${id} data successfully fetched`,
     })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Error is Occur or Server error"

        })

    }
}