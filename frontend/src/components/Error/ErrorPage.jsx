import React from "react";
import Navbar from "../Navbar/Navbar";
import "./ErrorPage.css";
function ErrorPage() {
  return (
    <>
      <Navbar />
      <div className="not-found-container">
        <h1 className="not-found-title">404 Page</h1>
        <p className="not-found-message">
          Page Not Found Please check the path.
        </p>
      </div>
    </>
  );
}

export default ErrorPage;
