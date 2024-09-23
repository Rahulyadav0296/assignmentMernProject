import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/AppContext";
import "./Navbar.css";

function Navbar() {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  console.log("User token for navbar", token);

  const handleLogout = () => {
    setToken(null);
    navigate("/signin");
  };
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to={token !== null ? "/users/details" : "/users"}
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            {token !== null ? "Show Users" : "Create User"}
          </NavLink>
        </li>
        {token !== null && (
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-logout">
              <span>Logout</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
