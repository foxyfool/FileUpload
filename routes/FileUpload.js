// HANDLER FUNCTIONS - image / video / image reduce / local file upload
const express = require('express'); 

const router = express.Router();


// take handler function 
const{imageUpload,videoUpload,imageReducerUpload,localFileUpload} = require("../controllers/fileUpload");

router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/ReducerUpload",imageReducerUpload);
router.post("/localFileUpload",localFileUpload);


module.exports = router;