import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./decode.css";
import cover_recover from "../assets/result_cover_recover.png";
import secret_recover from "../assets/result_secret_recover.png";

const Decode = () => {
  const [stego, setStego] = useState(null);
  const [isError, SetError] = useState(false);

  const handleDecodeImage = async () => {
    if (!stego) {
      SetError(true);
      return;
    } else {
      SetError(false);
    }

    const formData = new FormData();
    formData.append("steg", stego);

    const response = await fetch("http://127.0.0.1:5001/decode_image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };
  return (
    <div>
      <div>encode page</div>
      <div>
        <input
          type="file"
          className="cover"
          onChange={(event) => setStego(event.target.files[0])}
        />
        {/* <img src={cover} alt="hi" /> */}
      </div>
      <div className="encode-button">
        <button className="button" onClick={handleDecodeImage}>
          Encode image
        </button>
        {isError && <p className="error">Please input stegano image</p>}
      </div>
      <div>
        <img className="stego-image" src={cover_recover} alt="hi" />
      </div>
      <div>
        <img className="stego-image" src={secret_recover} alt="hi" />
      </div>
      <Outlet />
    </div>
  );
};

export default Decode;
