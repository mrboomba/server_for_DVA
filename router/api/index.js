module.exports = (() => {
  const fs = require("fs");
  const path = require("path");
  const express = require("express");
  const router = express.Router();
  const fileUpload = require("express-fileupload");

  const files = fs.readdirSync(__dirname);

  router.post("/upload", function(req, res) {
    console.log("UPLOAD!!");
    console.log(req.files.foo);
    
    if (!req.files) return res.status(400).send("No files were uploaded.");

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.foo;
    let fileName = file.name;
    let splitArray = fileName.split(".");
    let ext = splitArray[splitArray.length-1];

    let email = req.body.email;
    
    console.log(req.body);
    
    


    // Use the mv() method to place the file somewhere on your server
    file.mv(path.join(__dirname , "../../video/1"+ext), function(err) {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
    });
  });
  return router;
})();
