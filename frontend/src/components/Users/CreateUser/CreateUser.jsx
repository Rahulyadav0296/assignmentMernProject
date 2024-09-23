import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import usePostRequest from "../../Hooks/usePostRequest";
import "./CreateUser.css";

const socket = io("http://localhost:3000");

const calculateAge = (birthdate) => {
  const [year, month, day] = birthdate.split("-").map(Number);
  const birthDateObj = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  const dayDiff = today.getDate() - birthDateObj.getDate();

  // Adjust age if the birthday hasn't happened yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const { postRequest, message, loading } = usePostRequest();
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

    const userAge = calculateAge(user.age);

    if (userAge < 18) {
      toast.error("You must be at least 18 years old to sign up.");
      return;
    }

    postRequest("http://localhost:3000/users", user, null, (data) => {
      console.log("User Created: ", data.user),
        socket.emit("newData", data.user),
        setUser({
          name: "",
          email: "",
          age: "",
          password: "",
        });
    });
    navigate("/signin");
  };

  return (
    <div className="user-form-container">
      <h2 className="form-heading">Create User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Enter Your Name..."
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="age">Date of Birth:</label>
          <input
            type="date"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating User...." : "Create User"}
        </button>
        {message && <p>{message}</p>}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="signup-container">
        <div className="signup-message">
          Already have an Account{" "}
          <Link to="/signin" className="signup-link">
            Login
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default CreateUser;
