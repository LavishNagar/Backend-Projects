//import mongoose

const mongoose = require("mongoose");

//write route handler
//kis post pr like kiya hai
//kis user ne like kiya hai
const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: String,
    required: true,
  },
});

//export
module.exports = mongoose.model("Like", likeSchema);
