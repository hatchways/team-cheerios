import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  imageDiv: {
    width: "10%",
    height: "10%",
    backgroundSize: "contain"

  },
}));

export default function MyDropzone() {
  const classes = useStyles();
  const [selectedFile, setselectedFile] = React.useState(null);

  const onDrop = useCallback((acceptedFile) => {
    // Do something with the files
    setselectedFile(acceptedFile);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={classes.imageDiv}>
        <img
          src="https://www.w3schools.com/images/picture.jpg"
          alt="Mountain"
        />
      </div>
    </div>
  );
}
