const { deleteComment, getBlogs } = require('../services/blog.service.js');
const { BlogService } = require('../services/index.js')

const BlogControllers = {
    async getBlogs(req, res, next) {
        try {
            BlogService.getBlogs().then((data) => {
                return res.status(200).json({
                    message: "Successfully got all the blogs",
                    blogs: data
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: "Couldn\'t got the blogs",
                    error: error
                })
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Internal Server error',
                error: error
            })
        }
    },
    async addBlog(req, res, next) {
        try {
            // Fetch UserId from the req.params
            let { userId } = req.params

            // Fetch data from the request body
            let { caption, image, video } = req.body
            console.log({ caption, image, video, userId });

            // Call the addBlog function
            BlogService.addBlog(caption, image, video, userId).then((data) => {
                return res.status(200).json({
                    message: "Successfully posted",
                    blog: data.blog
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: "Couldn\'t add the blog",
                    error: error
                })
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Internal Server error',
                error: error
            })
        }
    },
    async likeOrDislike(req, res, next) {
        try {
            const { userId, blogId } = req.params
            BlogService.likeOrDislike(userId, blogId).then((data) => {
                return res.status(200).json({
                    message: data.message,
                    like: data.blog
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: "Couldn\'t do the like or dislike operation",
                    error: error
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: "Couldn\'t do the like or dislike operation",
                error: error
            })
        }
    },
    async addComment(req, res, next) {
        try {
            const { userId, blogId } = req.params
            const { comment } = req.body

            BlogService.addComment(comment, blogId, userId).then((data) => {
                return res.status(200).json({
                    message: "Comment posted!",
                    blog: data.blog
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: 'Invalid catch Error',
                    error: error
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: "Invalid server error"
            })
        }
    },
    async deleteComment(req, res, next) {
        try {
            const { commentId, blogId } = req.params
            // console.log({ commentId, blogId });
            BlogService.deleteComment(commentId, blogId).then((data) => {
                return res.status(200).json({
                    message: "comment deleted!",
                    blog: data.blog
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: "Invalid catch error",
                    error: error
                })
            })
        } catch (error) {
            return res.status(200).json({
                message: "Invalid server error"
            })
        }
    }
}

module.exports = BlogControllers