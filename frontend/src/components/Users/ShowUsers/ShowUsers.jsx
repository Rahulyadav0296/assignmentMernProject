import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { AppContext } from "../../../utils/AppContext";
import "./ShowUsers.css";

const socket = io("http://localhost:3000"); // Adjust the URL as needed

function ShowUsers() {
  const [users, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/users/details")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setShowMessage(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
        setShowMessage(false);
      });

    // Listen for new user data from Socket.IO
    socket.on("newData", (newUser) => {
      setUser((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      socket.off("newData"); // Cleanup the listener on component unmount
    };
  }, [socket]);

  const getAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getDateAndTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  const downloadCSV = () => {
    const csvRows = [];
    const headers = Object.keys(users[0]);
    csvRows.push(headers.join(","));

    for (const row of users) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"'); // Escape double quotes
        return `"${escaped}"`; // Wrap in quotes
      });
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // create a link element
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={`${user._id} - ${index}`}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getAge(user.age)} years</td>
                <td>{getDateAndTime(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
      <button onClick={downloadCSV}>Download</button>
      {showMessage && <p className="error-message">{message}</p>}
    </div>
  );
}

export default ShowUsers;
