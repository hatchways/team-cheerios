const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});
const storage = multer.memoryStorage();

//Upload Profile picture
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

router.post("/upload", upload.single("image"), (req, res) => {
  //TODO : Extract URL after 
  //TODO : Upload image to s3 bucket 
  s3.putObject(
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "your-key-name",
      Body: req.file.buffer,
      ACL: "public-read", // your permisions
    },
    (err) => {
      if (err) return res.status(400).send(err);
      res.statusCode(200).send("File uploaded to S3");
    }
  );
  
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
});

module.exports = router;
