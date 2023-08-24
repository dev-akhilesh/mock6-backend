// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Create a new blog
router.post('/', authMiddleware, blogController.createBlog);

// Get a single blog by ID
router.get('/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/:id', authMiddleware, blogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', authMiddleware, blogController.deleteBlog);

// Like a blog by ID
router.put('/:id/like', authMiddleware, blogController.likeBlog);

// Comment on a blog by ID
router.put('/:id/comment', authMiddleware, blogController.commentBlog);

module.exports = router;
