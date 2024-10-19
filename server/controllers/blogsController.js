const Blog = require('../models/blogs');

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    blog.writer = req.user._id;
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate({'writer': 'name'}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({'writer': 'name'});
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
