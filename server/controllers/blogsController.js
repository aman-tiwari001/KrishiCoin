const Blog = require('../models/blogs');

exports.createBlog = async (req, res) => {
  try {
    const {title , content , image} = req.body;
    const blog = new Blog({title , content , image, writer: req.user._id});
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('writer','name').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('writer','name').populate('upvotes','name').populate('downvotes','name');
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.upvoteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const user = req.user._id;

    if (blog.upvotes.includes(user)) {
      blog.upvotes.pull(user);
    } else {
      blog.upvotes.push(user);
      blog.downvotes.pull(user);
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.downvoteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const user = req.user._id;

    if (blog.downvotes.includes(user)) {
      blog.downvotes.pull(user);
    } else {
      blog.downvotes.push(user);
      blog.upvotes.pull(user);
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
