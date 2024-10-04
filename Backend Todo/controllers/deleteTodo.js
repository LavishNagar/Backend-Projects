const Todo=require("../models/Todo");


exports.deleteTodo=async(req,res)=>{
    const {id}=req.params;
    
    const todo = await Todo.findByIdAndDelete({ _id: id });
    try{
        res.status(200).json({
            success:true,
            data:todo,
            message:`Data is Successfully Deleted . Deleted data is-${id}`
            




        })

    }
    catch (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          error: err.message,
          message: "Error Occur druing Deleting Item",
        });
      }

}