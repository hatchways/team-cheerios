const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");

const s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");
router.post("/uploading", upload, function (req, res) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: "public-read",
  };

  s3bucket.upload(params, function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data.Location);
    }
  });
});

module.exports = router;
