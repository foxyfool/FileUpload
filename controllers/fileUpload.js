const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

// localfileUpload -  handler function
exports.localFileUpload = async (req,res) => {
  try{
    //fetch the file
    //(file) is the key to test in POSTMAN

    const file = req.files.file;
    console.log("File Has Arrived ",file);

    // path server store 
    //__dirname = cd = __dirname - 
    //server path 
    let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
    console.log("Path => ",path);

    //move fx for the file 
    file.mv(path,(err)=>{
      console.log(err);
    });

    res.json({
      success:true,
      message:'local file Uploaded Successfully',
    })

  }
  catch(error) {
    console.log("Not Able to Upload upload the file on server ")
    console.log(error);
  }
}
//checking 
function isFileTypeSupported(type,supportedType){
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
  const options = { folder };
  options.resource_type = "auto";
  console.log("temp file path", file.tempFilePath);
  if(quality){
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// imageUpload -  handler function

exports.imageUpload = async (req,res) => {
  try{
   //data fetch
   //validation - check if file type supported or not?
   //upload to cloudinary
   //db save
   //successfull Response
   const{name,tags,email} = req.body;
   console.log(name,tags,email);
   
   const file = req.files.imageFile;
   console.log(file);

   // validation 
   const supportedType = ["jpg","jpeg","png"];
   const fileType = file.name.split('.')[1].toLowerCase();
   console.log("FILE TYPE ",fileType);

  // not supported
   if(!isFileTypeSupported(fileType,supportedType)){
    return res.status(400).json({
      success:false,
      message:"File Format Not Supported!"
    })
   }

   // file format supported hai !
   console.log("Uploading to MT3fox");
   const response = await uploadFileToCloudinary(file,"Mt3fox");
   console.log(response);

  //  db save entry 
   const filedata = await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
   })

  res.json({
    success:true,
    imageUrl:response.secure_url,
    message:'Image Successfully uploaded!',
  })


  }
  catch(error) {
    console.error(error);
    res.status({
      success:false,
      message:"SomeThing went wrong!"
    })
  }
}

exports.videoUpload = async (req,res) => {
  try{
     //data fetch
     const { name, tags, email} = req.body;
     console.log(name,tags,email);

    const file = req.files.videofile;

    
    const supportedTypes = ["mp4", "mov"];
    const supportedSizeMB = 5; // Maximum size allowed in MB
    const fileSizeMB = file.size / (1024 * 1024); // Converting bytes to MB
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type:", fileType);
    console.log("File Size (MB):", fileSizeMB);

    if(!isFileTypeSupported(fileType, supportedTypes)) {
     return res.status(400).json({
        success:false,
        message:'File format not supported',
    })
   }
       // Check if file size is within the limit
       if (fileSizeMB > supportedSizeMB) {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds the limit (5MB)',
        });
      }

      //file format supported hai
      console.log("Uploading to Mt3Fox");
      const response = await uploadFileToCloudinary(file, "mtVideo");
      console.log(response);

      //db me entry save krni h
      const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url,
      });

      res.json({
          success:true,
          imageUrl:response.secure_url,
          message:'Video Successfully Uploaded',
      })
  
  }
  catch(error) {
    console.error(error);
    res.status(400).json({
        success:false,
        message:'Something went wrong',
    })
}
}

exports.imageReducerUpload = async (req,res) => {
  try{
    //data fetch
    const { name, tags, email} = req.body;
    console.log(name,tags,email);

    const file = req.files.imageFile;
    console.log(file);

    //Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type:", fileType);

    if(!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
            success:false,
            message:'File format not supported',
        })
    }


    console.log("Uploading to Mt3fox");

    const response = await uploadFileToCloudinary(file, "Mt3fox", 90);
    console.log(response);

    //db me entry save krni h
    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
    });

    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'Image Successfully Uploaded',
    })
}
  catch(error) {
    console.error(error);
    res.status(400).json({
        success:false,
        message:'Something went wrong',
    })
}
}