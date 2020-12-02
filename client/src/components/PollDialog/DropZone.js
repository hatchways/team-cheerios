import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  imageDiv: {
    width: 200,
    height: 210,
    "& img": {
      objectFit: "cover",
    },
  },
  imagePreviewDiv: {
    width: "100%",
    height: "100%",
  },
}));

export default function MyDropzone({ onChange, defaultImg }) {
  const classes = useStyles();
  const [dropped, setDropped] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const onDrop = useCallback((acceptedFile) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(acceptedFile[0]);

      reader.onload = () => {
        if (!!reader.result) {
          resolve(reader.result);
        } else {
          reject(Error("Failed converting to base64"));
        }
      };
    });
    promise.then(
      (result) => {
        setFile(result);
        onChange(acceptedFile[0]);
      },
      (err) => {
        console.log(err);
      }
    );
    setDropped(true);
    //eslint-disable-next-line
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={classes.imageDiv}>
        {!dropped ? (
          <img
            className={classes.imagePreviewDiv}
            alt="default"
            src={defaultImg ? defaultImg : "https://i.ibb.co/rF1P2WT/drop.png"}
          />
        ) : (
          <img
            className={classes.imagePreviewDiv}
            src={file}
            alt="Loading..."
          />
        )}
      </div>
    </div>
  );
}
