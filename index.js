const express = require("express");
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const md5 = require("md5");
const CryptoJS = require("crypto-js");
const sha256 = require("sha256");
const app = express();
const upload = multer({dest: "uploads/"});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));

const port = 3000 | process.env.PORT;

app.get("/", function(req, res) {
    res.render("index", {message: ""});
});

app.post("/", upload.array("files", 2), function (req, res) {
  
  let fileArr = []

  if (req.body.algorithm === undefined) {
    res.render("index", {message: "Please select an algorithm to use."})
  } else {
      switch (req.body.algorithm) {
    case "MD5":
        for (let i = 0; i < req.files.length; i++) {
        let path = req.files[i].path;  fileArr.push(md5(fs.readFileSync(path)));
         fs.unlinkSync(path);
          console.log(fileArr);     
        }
      break;
    case "SHA256":
        for (let i = 0; i < req.files.length; i++) {
         let path = req.files[i].path;
        fileArr.push(sha256(fs.readFileSync(path)));
          fs.unlinkSync(path);
          console.log(fileArr);
        }
      break;
    default:
      break;
  }
  if (fileArr[0] === undefined || fileArr[1] === undefined) {
    
    res.render("index", {message: "You are missing files!"});
    
  } else {
    
      if (Buffer.from(fileArr[0].toString()).equals(Buffer.from(fileArr[1].toString()))) {
    console.log("Match!")
    console.log(`${fileArr[0]} and ${fileArr[1]}`)
    res.render("index", {message: `The following are the generated hashes: ${fileArr[0]} and   ${fileArr[1]}. They are a match.`})
  } else {
    console.log("They do not match!")
    console.log(`${fileArr[0]} and ${fileArr[1]}`)
    res.render("index", {message: `The following are the generated hashes: ${fileArr[0]} and     ${fileArr[1]}. They are not a match.`})
  }
    
  }
  }
  
  // switch (req.body.algorithm) {
  //   case "MD5":
  //       for (let i = 0; i < req.files.length; i++) {
  //         fileArr.push(md5(fs.readFileSync(req.files[i].path)));
  //         console.log(fileArr);
  //       }
  //     break;
  //   case "SHA256":
  //       for (let i = 0; i < req.files.length; i++) {
  //         fileArr.push(sha256(fs.readFileSync(req.files[i].path)));
  //         console.log(fileArr);
  //       }
  //     break;
  //   default:
  //     break;
  // }
  // if (fileArr[0] === undefined || fileArr[1] === undefined) {
    
  //   res.render("index", {message: "You are missing files!"});
    
  // } else {
    
  //     if (Buffer.from(fileArr[0].toString()).equals(Buffer.from(fileArr[1].toString()))) {
  //   console.log("Match!")
  //   console.log(`${fileArr[0]} and ${fileArr[1]}`)
  //   res.render("index", {message: `The following are the generated hashes: ${fileArr[0]} and   ${fileArr[1]}. They are a match.`})
  // } else {
  //   console.log("They do not match!")
  //   console.log(`${fileArr[0]} and ${fileArr[1]}`)
  //   res.render("index", {message: `The following are the generated hashes: ${fileArr[0]} and     ${fileArr[1]}. They are not a match.`})
  // }
    
  // }

  console.log(req.body);
  
});

app.listen(port, function () {
    console.log(`The Node.js server is listening at port: ${port}`);
})