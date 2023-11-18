import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import image_steg from "../assets/result_steg_image.png";
import image_default from "../assets/default-upload.jpg";
import arrow from "../assets/arrow.png";
import steg_default from "../assets/default-stegano.jpg";
import loading from "../assets/loading.gif";
import "./encode.css";

const Encode = () => {
  const [cover, setCover] = useState(null);
  const [secret, setSecret] = useState(null);
  const [coverURL, setCoverURL] = useState(image_default);
  const [secretURL, setSecretURL] = useState(image_default);
  const [isError, SetError] = useState(false);
  const inputFileSecretRef = useRef();
  const inputFileCoverRef = useRef();
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEncodeImage = async () => {
    setIsLoading(true);
    if (!cover || !secret) {
      SetError(true);
      setIsLoading(false);
      return;
    } else {
      SetError(false);
    }

    const formData = new FormData();
    formData.append("cover", cover);
    formData.append("secret", secret);

    try {
      await fetch("http://127.0.0.1:5000/encode_image", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
      setIsDone(true);
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
        <div>
          <img className="arrow" src={arrow} alt="arrow" />
        </div>
        <div>
          <h3 className="steg-title">Stegano Image Result:</h3>
          <div>
            {isDone && !isLoading && (
              <img className="image" src={image_steg} alt="hi" />
            )}
            {!isDone && !isLoading && (
              <img className="image" src={steg_default} alt="hi" />
            )}
            {isLoading && <img className="loading" src={loading} alt="hi" />}
          </div>
        </div>
        <Outlet />
      </div>

      <button className="encode-button" onClick={handleEncodeImage}>
        Encode image
      </button>
      {isError && (
        <p className="error">Please input cover image and secret image</p>
      )}
    </div>
  );
};

export default Encode;
