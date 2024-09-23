import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/AppContext";
import Blogs from "./Blogs/Blogs";
import CreateBlog from "./CreateBlogs/CreateBlog";
import "./Home.css";

function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="home-container">
        {/* Create New Blog Button */}
        <button
          className="create-blog-btn"
          onClick={() => {
            setShowCreate(!showCreate);
          }}
        >
          {showCreate ? "Hide Create Blog" : "Create Blog"}
        </button>

        {/* Show Create Blog Form */}
        {showCreate && (
          <div className="create-blog-section">
            <CreateBlog />
          </div>
        )}

        {/* Display Blogs */}
        <div className="blogs-section">
          <Blogs />
        </div>
      </div>
    </>
  );
}

export default Home;
