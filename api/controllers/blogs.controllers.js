const { BlogService } = require('../services/index.js')

const BlogControllers = {
    async addBlog(req, res, next) {
        try {
            // Fetch UserId from the req.params
            let { userId } = req.params

            // Fetch data from the request body
            let { caption, image, video } = req.body
            console.log({ caption, image, video, userId });

            // Call the addBlog function
            BlogService.addBlog(caption, image, video, userId).then((data) => {
                res.status(200).json({
                    message: "Successfully posted",
                    blog: data.blog
                })
            }).catch((error) => {
                console.log(error);
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
            const { userId } = req.params
            const { blogId } = req.body
            BlogService.likeOrDislike(userId, blogId).then((data) => {
                return res.status(200).json({
                    message: "Successfully likes or disliked",
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
    }
}

module.exports = BlogControllers