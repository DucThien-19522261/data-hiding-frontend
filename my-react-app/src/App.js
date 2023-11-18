import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layout/layout";
import Encode from "./encode/encode";
import Decode from "./decode/decode";

function App() {
  return (
    <Router location>
      <Navigation />
      <Routes>
        <Route path="encode" element={<Encode />} />
        <Route path="decode" element={<Decode />} />
      </Routes>
    </Router>
  );
}

export default App;
