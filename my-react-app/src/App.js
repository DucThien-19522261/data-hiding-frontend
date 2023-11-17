import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import image from "./logo192.png";

function App() {
  const [file, setFile] = useState();
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleUploadImage = async (e) => {
    console.log(e);
    setFile(URL.createObjectURL(e.target.files[0]));

    const file = e.target.files[0];
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" name="myImage" onChange={handleUploadImage} />
        <img src={image} alt="hi" />
        <button onClick={() => console.log("hi")}>click</button>
      </header>
    </div>
  );
}

export default App;
