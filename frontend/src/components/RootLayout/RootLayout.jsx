import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function RootLayout() {
  return (
    <div className="root-container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
