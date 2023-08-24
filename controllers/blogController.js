// controllers/blogController.js

const Blog = require('../models/Blog');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, content, category, date } = req.body;

        const newBlog = new Blog({
            title,
            content,
            category,
            date,
            author: req.user._id, // Attach the author (logged-in user) to the blog
            likes: 0,
            comments: [],
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!updatedBlog) return res.status(404).json({ message: 'Blog not found.' });

        res.json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndRemove(req.params.id);

        if (!deletedBlog) return res.status(404).json({ message: 'Blog not found.' });

        res.json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Like a blog by ID
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        blog.likes += 1;
        await blog.save();

        res.json({ message: 'Liked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Comment on a blog by ID
exports.commentBlog = async (req, res) => {
    try {
        const { username, content } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: 'Blog not found.' });

        blog.comments.push({ username, content });
        await blog.save();

        res.json({ message: 'Commented successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
