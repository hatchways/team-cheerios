const { User } = require("../models/userModel");

exports.changeProfilePicture = async (req, res) => {
  let email = req.body.email;
  let newImage = req.body.image;
  User.updateOne(
    { email: email },
    {
      image: newImage,
    },
    function (err, affected, resp) {
      if (err) {
        console.log(err);
      }
      res.status(201).send(resp);
    }
  );
};
//TO DO: Change Name...
