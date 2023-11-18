import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

const Navigation = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li className="title">GROUP12_HINET</li>
          <li>
            <NavLink to="/encode">ENCODE</NavLink>
          </li>
          <li>
            <NavLink to="/decode">DECODE</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
