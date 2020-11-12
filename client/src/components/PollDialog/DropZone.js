import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  imageDiv: {
    maxWidth: "1%",
    maxHeight: "1%",

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
          src="https://i.ibb.co/rF1P2WT/drop.png"
          alt="Drag and Drop"
        />
      </div>
    </div>
  );
}
