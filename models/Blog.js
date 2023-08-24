// models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  date: Date,
  likes: Number,
  comments: [
    {
      username: String,
      content: String,
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Blog', blogSchema);
