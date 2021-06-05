const { Blogs, Likes, Comments } = require('../models')

const BlogService = {
    async addBlog(caption, image, video, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = {
                    caption: caption,
                    image: image,
                    video: video,
                    posted_by: userId
                }

                let blog = await Blogs.create(data)

                if (!blog) {
                    reject({ error: 'Sorry, Couldn\'t post the blog!' })
                }
                resolve({ blog: blog })
            } catch (error) {
                reject({ error: error })
            }
        })
    },

    async likeOrDislike(userId, blogId) {
        console.log(blogId);
        return new Promise(async (resolve, reject) => {
            try {
                // Find the Blog
                const blog = await Blogs.findOne({ _id: blogId })
                if (!blog) reject({ error: "The requested blog doesn't exist anymore" })
                // Prepare the like data
                const data = {
                    blog: blogId,
                    liked_by: userId,
                }
                // Create a new Like
                let like = await Likes.create(data)
                if (!like) reject({ message: "Coludn\'t create the like table" })

                // Push the like object in current blog
                blog.likes.push(like)

                //save the blog
                blog.save()
                console.log(blog);
                resolve({ blog: blog })
            } catch (error) {
                reject({ error: "Sorry, Problem at server side!" })
            }
        })
    }
}
module.exports = BlogService