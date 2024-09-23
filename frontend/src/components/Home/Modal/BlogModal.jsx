import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import React, { forwardRef } from "react";
import { getDate } from "../../../utils/dateUtils";
import "./BlogModal.css";

const style = {
  position: "absolute",
  top: "50%", // Center vertically
  left: "50%", // Center horizontally
  transform: "translate(-50%, -50%)", // Adjust for proper centering
  backgroundColor: "#fff", // Better to use a proper color format
  borderRadius: "12px",
  width: "90%", // Simplified width for better small screen support
  maxWidth: "1000px", // Ensure it doesn't exceed this on larger screens
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)", // More subtle shadow
  padding: "16px", // More readable padding
};

const BlogModal = forwardRef(({ blog, handleClose, open }, ref) => {
  return (
    <Box
      ref={ref}
      tabIndex={0}
      sx={style}
      className={open ? "modal-open" : "modal-close"}
    >
      <div className="modal-header">
        <h1 className="modal-title">{blog.title}</h1>
        <Button
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </Button>
      </div>
      <div className="modal-info">
        <p className="modal-date">{getDate(blog.createdAt)}</p>
        <p>
          In <strong>{blog.category}</strong>
        </p>
      </div>
      <div className="modal-image">
        <img src={blog.image} alt={blog.title} />
      </div>
      <p className="modal-content">{blog.content}</p>
      <div className="modal-author">
        <p>
          <i>Posted By:</i>
        </p>
        <h4>{blog.authorId.name}</h4>
        <p>{blog.authorId.email}</p>
      </div>
    </Box>
  );
});

export default BlogModal;
