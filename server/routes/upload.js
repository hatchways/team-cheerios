const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString());
    },
  }),
}).array("image", 2);

router.post("/upload", function (req, res, next) {
  upload(req, res, (error) => {
    if (error) {
      res.status(500).json({ status: "fail", error: error });
    } else {
      if (req.files === undefined) {
        console.log("uploadProductsImages Error: No File Selected!");
        res.status(500).json({
          status: "fail",
          message: "Error: No File Selected",
        });
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const images = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          images.push(fileLocation);
        }
        return res.status(200).json({
          status: "ok",
          locationArray: images,
        });
      }
    }
  });
});

module.exports = router;
