const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");

const storage = multer.memoryStorage();


const upload = multer({ storage: storage });
router.post("/uploading", upload.single("image"), function (req, res) {
  console.log("POST Request obtained...");
  //console.log(req.file);

  const s3bucket = new AWS.S3({
    
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const params = {
    Bucket: "images-cheerios",
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: "public-read",
  };

  //console.log(process.env.IDENTITY_POOL_ID);
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log("Error sending to s3....");
      res.status(400).send(err);
    } else {
      res.status(200).send("Uploaded.... at " + data);
    }
  });
});

module.exports = router;

