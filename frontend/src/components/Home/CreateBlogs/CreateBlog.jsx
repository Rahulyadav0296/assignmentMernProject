import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { AppContext } from "../../../utils/AppContext";
import usePostRequest from "../../Hooks/usePostRequest";
import "./CreateBlog.css";
import Form from "./Form/Form";
const socket = io("http://localhost:3000");

function CreateBlog() {
  const { blog, setBlog, token } = useContext(AppContext);
  const navigate = useNavigate();
  const { postRequest, message, loading } = usePostRequest();

  const handleBlog = (e) => {
    e.preventDefault();

    postRequest("http://localhost:3000/blog/create", blog, token, (data) => {
      console.log("User Created: ", data),
        socket.emit("newData", data),
        setBlog({
          title: "",
          content: "",
          image: "",
          category: "",
        });
    });
    navigate("/blog");
  };

  return (
    <>
      <Form handleBlog={handleBlog} />
      {loading && <p>Creating Blog...</p>}
      {message && <p>{message}</p>}
    </>
  );
}

export default CreateBlog;
