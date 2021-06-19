const express = require('express')
const router = express.Router()

const { BlogControllers } = require('../controllers')

router.post('/upload/:userId', BlogControllers.addBlog)
router.get('/like/:userId/:blogId', BlogControllers.likeOrDislike)
router.post('/comment/:userId/:blogId', BlogControllers.addComment)
router.get('/comment/:commentId/:blogId', BlogControllers.deleteComment)

module.exports = router