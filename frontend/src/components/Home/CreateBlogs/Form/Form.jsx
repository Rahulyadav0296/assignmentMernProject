import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../../utils/AppContext";
import { blogCategories } from "../../../../utils/blogs";

function Form({ handleBlog }) {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { blog, setBlog, editBlog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Id is: ", id);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(blog),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      navigate("/");
      setBlog({
        title: "",
        content: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };
  console.log("Blog is: ", blog);

  return (
    <>
      <form onSubmit={editBlog ? handleSave : handleBlog} className="blog-form">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Content</label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="form-textarea"
        ></textarea>

        <label className="form-label">Image URL</label>
        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Choose Category: </label>
        <select
          name="category"
          value={blog.category}
          onChange={handleChange}
          className="form-select"
        >
          {blogCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button type="submit" className="form-button">
          {`${editBlog ? "Save Blog" : "Create Blog"} `}
        </button>
      </form>
      {message && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </>
  );
}

export default Form;
