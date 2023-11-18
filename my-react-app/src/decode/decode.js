import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import "./decode.css";
import cover_recover from "../assets/result_cover_recover.png";
import secret_recover from "../assets/result_secret_recover.png";
import image_default from "../assets/default-upload.jpg";

const Decode = () => {
  const [stego, setStego] = useState(null);
  const [stegoURL, setSteganoURL] = useState(image_default);
  const [isError, SetError] = useState(false);
  const inputFileStegRef = useRef();

  const handleDecodeImage = async () => {
    if (!stego) {
      SetError(true);
      return;
    } else {
      SetError(false);
    }

    const formData = new FormData();
    formData.append("steg", stego);

    try {
      await fetch("http://127.0.0.1:5001/decode_image", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.debug(error);
    }
  };

  const handleUploadStegano = (event) => {
    setStego(event.target.files[0]);
    if (event.target.files[0])
      setSteganoURL(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <div className="grid-container">
        <div>
          <h3>Upload stegano image:</h3>
          <input
            ref={inputFileStegRef}
            type="file"
            className="cover"
            onChange={handleUploadStegano}
          />
          <div className="input-image">
            <img
              className="image"
              src={stegoURL}
              alt="hi"
              onClick={() => {
                if (!stego) {
                  inputFileStegRef.current.click();
                }
              }}
            />
          </div>
        </div>
        <div></div>
        <div>
          <h3 className="steg-title">Recover Cover Image:</h3>
          <div>
            <img className="image" src={cover_recover} alt="hi" />
          </div>
        </div>
        <div>
          <h3 className="steg-title">Recover Secret Image:</h3>
          <div>
            <img className="image" src={secret_recover} alt="hi" />
          </div>
        </div>
      </div>

      <button className="encode-button" onClick={handleDecodeImage}>
        Decode image
      </button>
      {isError && <p className="error">Please input stegano image</p>}
      <Outlet />
    </div>
  );
};

export default Decode;
