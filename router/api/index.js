module.exports = (() => {
  const fs = require("fs");
  const path = require("path");
  const express = require("express");
  const router = express.Router();
  const fileUpload = require("express-fileupload");
  const user = require("../../models/user");
  var PythonShell = require("python-shell");

  var options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: path.join(__dirname, "../../python/"),
    args: [path.join(__dirname, "../../video/")]
  };

  


  const files = fs.readdirSync(__dirname);

  var crypto = require("crypto");

  //function code taken from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
  function randomValueHex(len) {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString("hex") // convert to hexadecimal format
      .slice(0, len)
      .toUpperCase(); // return required number of characters
  }

  router.post("/upload", function(req, res) {
    console.log("UPLOAD!!");
    console.log(req.files.foo);

    if (!req.files) return res.status(400).send("No files were uploaded.");

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.foo;
    let fileName = file.name;
    let splitArray = fileName.split(".");
    let ext = splitArray[splitArray.length - 1];

    let email = req.body.email;
    let loc = {
      lat: req.body.lat,
      long: req.body.long
    };
    let heading = req.body.heading;

    console.log(req.body);
    var code = randomValueHex(4);
    var usr = {
      email: email,
      filename: code + "." + ext,
      loc: loc,
      code: code,
      heading: heading
    };

    user.create(usr, function(err, newUser) {
      if (err) {
        console.log(err);

        return res.status(500).send(err);
      }
      // Use the mv() method to place the file somewhere on your server
      file.mv(path.join(__dirname, "../../video/" + newUser.filename), function(
        err
      ) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        options.args.push(newUser.filename);
        PythonShell.run("data_prepare.py", options, function(err, results) {
          if (err) throw err;
          var options2 = {
            mode: "text",
            pythonOptions: ["-u"], // get print results in real-time
            scriptPath: path.join(__dirname, "../../KitiiSeg/"),
            args: ["--input_image",path.join(__dirname, "../../result/"+newUser.filename)]
          };
          PythonShell.run("demo.py", options2, function(err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
          });
        });
        res.status(200).json({ status: "success" });
      });
    });
  });
  return router;
})();
