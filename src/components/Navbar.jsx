import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ visible }) {
  return (
    <div className={`navbar ${visible ? "navbar-show" : ""}`}>
      <div className="navbar-logo">Care You</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
        <Link to="/chatAI">Chat AI</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}
