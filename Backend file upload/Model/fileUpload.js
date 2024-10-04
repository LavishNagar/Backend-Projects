const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});


fileSchema.post('save',async function(doc){
    try{
        console.log("DOC",doc);
        //create transporter using node mailer
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD,

            }
        });
        // console.log("Transporter",transporter);

        // now send mail
        let info =await transporter.sendMail({
            from:'"Lavish" <lavishnagar758@gmail.com>',
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>File uploaded, Are you listinig</h2> <p>View here: <a href=${doc.imageUrl}>${doc.imageUrl}</p>`
        })
        console.log("INFO",info);

    }
    catch(error){
        console.error(error);
    

    }
})



module.exports=mongoose.model("File",fileSchema);