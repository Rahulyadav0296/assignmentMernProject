import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { AppContext } from "../../../utils/AppContext";
import "./Login.css";

const socket = io("http://localhost:3000");

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log("Server Error: ", data.error);
        } else {
          socket.emit("newData", data.user); // Emit the new user data
          setToken(data.token);
          setUser({
            email: "",
            password: "",
          });

          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        setMessage(err);
      });
  };
  return (
    <div className="user-form-container">
      <h2 className="form-heading">Login</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter Your Email..."
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter Your Password..."
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <div className="signup-container">
        <div className="signup-message">
          Don't have an Account?{" "}
          <Link to="/users" className="signup-link">
            Signup
          </Link>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
