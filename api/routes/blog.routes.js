const express = require('express')
const router = express.Router()

const { BlogControllers } = require('../controllers')

router.post('/upload/:userId', BlogControllers.addBlog)
router.post('/like/:userId/:blogId', BlogControllers.likeOrDislike)

module.exports = router