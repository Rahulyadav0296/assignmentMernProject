import { Modal } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/AppContext";
import { getDate } from "../../../utils/dateUtils";
import BlogModal from "../Modal/BlogModal";
import "./Blogs.css";

function Blogs() {
  const { setBlog, setEditBlog } = useContext(AppContext);
  const modalRef = useRef();
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState(null);
  const [open, setOpen] = useState(false);
  const [blogContent, setBlogContent] = useState(null);
  const [filterBlogDetails, setFilterBlogDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFilterBlogDetails(blogs);
  }, [blogs]);

  useEffect(() => {
    fetch("http://localhost:3000/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      });
  }, []);

  const handleBlogById = (id) => {
    const filterBlog = blogs.find((blog, index) => blog._id === id);
    setBlogContent(filterBlog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    const blog = blogs.find((blog, index) => blog._id === id);
    setBlog(blog);
    setEditBlog(true);
    navigate(`/blog/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      if (!response.ok) {
        throw new Error("Faild to delete the blog post");
      }
      const data = await response.json();
      const remainBlogs = blogs.filter((blog, index) => blog._id !== id);
      setFilterBlogDetails(remainBlogs);
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="blog-list">
      {filterBlogDetails && filterBlogDetails.length > 0 ? (
        filterBlogDetails.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <div
              className="blog-image-container"
              onClick={() => {
                handleBlogById(blog._id);
              }}
            >
              <img className="blog-image" src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-content">
              <p className="blog-date">{getDate(blog.createdAt)}</p>
              <h1 className="blog-title">{blog.title}</h1>
              <p className="blog-description">{blog.content}</p>
              <p className="blog-category">{blog.category}</p>
            </div>
            <div className="blog-actions">
              <button
                className="btn edit-btn"
                onClick={() => {
                  handleEdit(blog._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => {
                  handleDelete(blog._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="loading-message">Loading...</p>
      )}
      {message && <p className="message">{message}</p>}
      <Modal open={open} onClose={handleClose}>
        <BlogModal
          blog={blogContent}
          handleClose={handleClose}
          ref={modalRef}
          open={open}
        />
      </Modal>
    </div>
  );
}

export default Blogs;
