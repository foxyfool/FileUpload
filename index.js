const express = require('express'); 
const app = express();

//(what To Do?) app create - port find - middleware - dbConnect - cloudConnect - apiRouteMount - activateServer

require("dotenv").config();
const PORT = process.env.PORT || 3000;

require("./config/databse").connect();
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use(express.json()); //Json parse 

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/",
}));

//route and mount
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload)

app.listen(PORT,()=>{
    console.log(`APP IS LISTENING AT ${PORT}`);
})





