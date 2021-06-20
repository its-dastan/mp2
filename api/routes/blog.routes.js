const express = require('express')
const router = express.Router()

const { BlogControllers } = require('../controllers')

// GET: http://localhost:3000/api/blogs
router.get('/', BlogControllers.getBlogs)

// POST:  http://localhost:3000/api/blogs/upload/{userId}
router.post('/upload/:userId', BlogControllers.addBlog)

// GET: http://localhost:3000/api/blogs/like/{userId}/{blogId}
router.get('/like/:userId/:blogId', BlogControllers.likeOrDislike)

// POST: http://localhost:3000/api/blogs/comment/{userId}/{blogId}
router.post('/comment/:userId/:blogId', BlogControllers.addComment)

// GET: http://localhost:3000/api/blogs/comment/{commentId}/{blogId}
router.get('/comment/:commentId/:blogId', BlogControllers.deleteComment)

module.exports = router