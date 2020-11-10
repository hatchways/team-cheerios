import React, { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";

const UploadPicture = () => {
  //const retrieveURL = (event) => {};
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState('');

  const uploadFile = (e) => {
    console.log("Uploading...");
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        if (!res.data.error) {
          setFile("");
          setFileName("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    console.log("File changed to :" + e.target.value);
    setFileName(e.target.files[0]);
    console.log(e.target.files[0]);
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
          <input
            onChange={handleFileChange}
            name="upload-photo"
            type="file"            
          />
          <Button onClick={uploadFile}>Upload!</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadPicture;
