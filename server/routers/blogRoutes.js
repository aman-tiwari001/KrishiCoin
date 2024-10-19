const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

const verifyToken = require('../middlewares/verify');

// create a blog
router.post('/create', verifyToken, blogsController.createBlog);

// get all blogs
router.get('/', verifyToken, blogsController.getBlogs);

// get a blog
router.get('/:id', verifyToken, blogsController.getBlog);
module.exports = router;
