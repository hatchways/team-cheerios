const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), function(req, res) {
  const file = req.file;
  //const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // console.log(process.env.AWS_ACCESS_KEY_ID);
  // console.log(process.env.AWS_SECRET_ACCESS_KEY);

  //Where you want to store your file
  console.log("Received request for /upload");
  console.log(process.env);
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.status(200).json("sucess");
    }
  });
});

module.exports = router;
//   const getUrlFromBucket = (s3Bucket, fileName) => {
//     return (
//       "https://" +
//       s3Bucket.config.params.Bucket +
//       ".s3-" +
//       s3Bucket.config.region +
//       ".amazonaws.com/" +
//       fileName
//     );
//   };



