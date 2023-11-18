import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import image_steg from "../assets/result_steg_image.png";
import image_default from "../assets/default-upload.jpg";
import "./encode.css";

const Encode = () => {
  const [cover, setCover] = useState(null);
  const [secret, setSecret] = useState(null);
  const [coverURL, setCoverURL] = useState(image_default);
  const [secretURL, setSecretURL] = useState(image_default);
  const [isError, SetError] = useState(false);
  const inputFileSecretRef = useRef();
  const inputFileCoverRef = useRef();
  const handleEncodeImage = async () => {
    if (!cover || !secret) {
      SetError(true);
      return;
    } else {
      SetError(false);
    }

    const formData = new FormData();
    formData.append("cover", cover);
    formData.append("secret", secret);
    console.log("formData: ", formData);

    try {
      await fetch("http://127.0.0.1:5000/encode_image", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.debug(error);
    }
  };

  const handleUploadCover = (event) => {
    setCover(event.target.files[0]);
    if (event.target.files[0])
      setCoverURL(URL.createObjectURL(event.target.files[0]));
  };

  const handleUploadSecret = (event) => {
    setSecret(event.target.files[0]);
    if (event.target.files[0])
      setSecretURL(URL.createObjectURL(event.target.files[0] || ""));
  };

  return (
    <div>
      <div className="grid-container">
        <div>
          <h3>Upload cover image:</h3>
          <input
            ref={inputFileCoverRef}
            type="file"
            className="cover"
            onChange={handleUploadCover}
          />
          <div className="input-image">
            <img
              className="image"
              src={coverURL}
              alt="hi"
              onClick={() => {
                if (!cover) {
                  inputFileCoverRef.current.click();
                }
              }}
            />
          </div>
        </div>
        <div>
          <h3>Upload recret image:</h3>
          <input
            ref={inputFileSecretRef}
            type="file"
            className="secret"
            onChange={handleUploadSecret}
          />
          <div className="input-image">
            <img
              className="image"
              src={secretURL}
              alt="hi"
              onClick={() => {
                if (!secret) {
                  inputFileSecretRef.current.click();
                }
              }}
            />
          </div>
        </div>
        <div className="encode-button">
          <button className="button" onClick={handleEncodeImage}>
            Encode image
          </button>
        </div>
        <div>
          <h3>Stegano Image Result:</h3>
          <div>
            <img className="image" src={image_steg} alt="hi" />
          </div>
        </div>
        <Outlet />
      </div>
      {isError && (
        <p className="error">Please input cover image and secret image</p>
      )}
    </div>
  );
};

export default Encode;
