import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/backToHome.css";
import { MdArrowBack } from "react-icons/md";

export default function BackToHome() {
  const location = useLocation();
  // don't show on the homepage itself
  if (location.pathname === "/") return null;

  return (
    <div className="backtohome-container">
      <Link to="/" className="backtohome-link">
        <MdArrowBack /> Back to Home
      </Link>
    </div>
  );
}
