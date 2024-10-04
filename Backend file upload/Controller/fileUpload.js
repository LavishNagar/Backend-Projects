
const File=require("../Model/fileUpload");
const cloudinary= require("cloudinary").v2;
//localfileupload ->  handler function

exports.localFileUpload=async (req,res)=>{
    try{
        console.log("i am inside contorller");

        //req.file.file    for fetch the file
        //for fileuploadtion need move()
        const file=req.files.file;
        console.log(file);
        //__dir ->  tell the current working directory(folder)

        //this is server 's path to store data in server
        let path= __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;
        console.log("PATH -->",path);

        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:true,
            message:'Local file uploaded Successfully',
        })

    }
    catch(error){
        console.log("not able to upload file on server");
        console.log(error);

    }
}




const checkValidType = (type, supportedTypes) => {
    return supportedTypes.includes(type);
  };
  
  async function uploadFileToCloudinary(file, folder,size) {
    const options = { folder };
    if(size){
      options.quality=size;
      
    }
    options.resource_type="auto";
    console.log("Options",options);
    // console.log("path",file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }
  
  //image upload handler
  
  exports.imageUpload = async (req, res) => {
    try {
      //extract detail of the file from the req.body
      const { email, tags, name } = req.body;
      console.log(name, email, tags);
      //receive a file
  
      const file = req.files.imageFile;
      console.log("file", file);
  
      // Validation
      const supportedTypes = ["jpg","jpeg", "png"];
      //check current file type
      const fileType = file.name.split(".")[1].toLowerCase();
      //  console.log('filetype',fileType);
      // console.log(checkValidType);
  
      if (!checkValidType(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: "File type is not supported!",
        });
      }
      // if file format is supported then upload on cloudinary
  
      const response = await uploadFileToCloudinary(file, "lavishfolder");
      console.log("response", response);
  
      //save entry in DB
      const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl: response.secure_url,
      });
  
      res.json({
        success: true,
        message: "Image successfuly Uploaded",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "something went wrong to your image upload code",
      });
    }
  };
  
  // write handler of the videoUpload
  
  exports.videoUpload = async (req, res) => {
    try {
      // extract details of the image from the req.body
      const { email, tags, name } = req.body;
      console.log(email, tags, name);
      // extract image from the request
      const videoFile = req.files.videoFile;
      console.log(videoFile);
  
      // apply validation for the video
  
      const supportedTypes = ["mp4", "mov"];
      const videofileType = videoFile.name.split(".")[1].toLowerCase();
      console.log(videofileType);
  
      if (!checkValidType(videofileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: "file type is not supported",
        });
      }
  
      const response = await uploadFileToCloudinary(videoFile, "lavishfolder");
      console.log(response);
  
      const fileData = await File.create({
        name,
        tags,
        email,
        videoUrl: response.secure_url,
      });
  
      res.json({
        success: true,
        message: "video successfuly Uploaded",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "error during image uplaoading",
      });
    }
  };
  
  exports.imageReduceUpload=async (req,res)=>{
      try{
          //extract data from the body for save entry in DB
          const {email,name,tags}=req.body;
          console.log(email,name,tags);
          // extract image from the body which i want to upload on cloudinary
          const ReduceImage=req.files.ReduceImage;
          console.log(ReduceImage);
  
  
          //apply validatoin
          const supportedTypes=['jpg','jpeg','png'];
          
          const filetype=ReduceImage.name.split(".")[1].toLowerCase();
          console.log(filetype);
          
          //check valid file type or not
          if(!checkValidType(filetype,supportedTypes)){
              return res.status(401).json({
                  success:false,
                  message:"file type is not supported"
              })
          }
  
          const response=await uploadFileToCloudinary(ReduceImage,'lavishfolder',90);
          console.log('Response',response);
  
        //save entry in DB
        const File=require("../Model/fileUpload");
        const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl: response.secure_url,
        });
    
        res.json({
          success: true,
          message: "Image successfuly Uploaded",
        });
  
  
      }
      catch(error){
          console.log(error);
          res.status(400).json({
              success:false,
              message:"Error to upload Reduce image"
          })
  
          
      
  }
  
  
  
  const File=require("../Model/fileUpload");
  
  //localfileupload ->  handler function
  
  exports.localFileUpload=async (req,res)=>{
      try{
          console.log("i am inside contorller");
  
          //req.file.file    for fetch the file
          //for fileuploadtion need move()
          const file=req.files.file;
          console.log(file);
          //__dir ->  tell the current working directory(folder)
  
          //this is server 's path to store data in server
          let path= __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;
          console.log("PATH -->",path);
  
          file.mv(path,(err)=>{
              console.log(err);
          });
          res.json({
              success:true,
              message:'Local file uploaded Successfully',
          })
  
      }
      catch(error){
          console.log("not able to upload file on server");
          console.log(error);
  
      }
  
  }
  }