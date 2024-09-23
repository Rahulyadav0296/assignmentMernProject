const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs");
const { authMiddleware } = require("../middleware/auth");

router.route("/blog/create").post(authMiddleware, blogController.createBlog);
// Route to get all blogs
router.get("/blog", blogController.getBlog);

// Route to update a blog by ID
router.put("/blog/:id", blogController.updateBlog);

// Route to delete a blog by ID
router.delete("/blog/:id", blogController.deleteBlog);

module.exports = router;
