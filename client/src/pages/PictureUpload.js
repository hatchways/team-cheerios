import React, { useState } from "react";
import { Button, Grid , Avatar } from "@material-ui/core";
import axios from "axios";

const UploadPicture = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const handleFileChange = (e) => {
    console.log("File changed to :" + e.target.value);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const uploadFile = (e) => {
    console.log("Uploading...");
    let formData = new FormData();
    formData.append("image", file);
    const url = "http://localhost:3001/uploading";
    axios
      .post(url, formData)
      .then((response) => {
        console.log(response.data);
        setUrl(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid>
          <input onChange={handleFileChange} name="upload-photo" type="file" />
          <Button onClick={uploadFile}>Upload!</Button>
          <Avatar alt="doggo" src= {url} />
        </Grid>
      </Grid>
    </>
  );
};

export default UploadPicture;
