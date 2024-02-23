// schema

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//route handler
const fileSchema = new mongoose.Schema({
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
    },
})

// mail - send POST MiddleWare - nodemail
fileSchema.post("save",async function(doc){
    try{
        // db entry = doc
        console.log("DOC",doc)

        // transporter using nodemailer
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //mail send 
        let info =  await transporter.sendMail({
            from:`rahuloqt`,
            to: doc.email,
            subject:"Congratulations!, Your file is now uploaded to cloudinary succesfully",
            html:`<h2>Your file has been uploaded!</h2><br><p>View: <a href ="${doc.imageUrl}">HERE</a></p>`,
        })
        console.log(info);
    }catch(error){
        console.error(error);
    }
})

// export 
const File = mongoose.model("File",fileSchema);
module.exports= File;