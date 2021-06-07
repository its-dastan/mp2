const { User, Blogs, Likes, Comments } = require('../models')

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
        return new Promise(async (resolve, reject) => {
            try {
                // Get the user
                const user = await User.findOne({ _id: userId })

                // Check If it already liked the blog or not
                if (user.liked_blogs.includes(blogId)) { // If Liked Dislike it
                    // Remove the like from Like Collection
                    const likes = await Likes.findOneAndDelete({ blogId: blogId, liked_by: userId })

                    // Remove the like from the blog document
                    const blog = await Blogs.findOneAndUpdate({ _id: blogId }, { $pull: { likes: likes._id } })
                    await blog.save()

                    // Remove the blog from User document
                    const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { liked_blogs: blogId } })
                    await user.save()
                    resolve({
                        message: "Disliked the blog",
                        blog: blog
                    })
                } else {
                    // Get the Blog
                    const blog = await Blogs.findOne({ _id: blogId })
                    if (!blog) reject({ error: "The requested blog doesn't exist anymore" })
                    const data = {
                        blogId: blogId,
                        liked_by: userId,
                    }

                    // Create a like doument
                    let like = await Likes.create(data)
                    if (!like) reject({ message: "Coludn\'t create the like table" })

                    // Add that like to the blog document
                    blog.likes.push(like)
                    await blog.save()

                    // Add the blog to the user document
                    user.liked_blogs.push(blog)
                    await user.save()
                    resolve({
                        message: "Liked the Blog",
                        blog: blog
                    })
                }

            } catch (error) {
                reject({ error: "Sorry, Problem at server side!" })
            }
        })
    },


    async addComment(comment, blogId, userId) {
        console.log(comment);
        return new Promise(async (resolve, reject) => {
            try {
                const blog = await Blogs.findOne({ _id: blogId })
                const data = {
                    comment: comment,
                    blogId: blogId,
                    comment_by: userId,
                }

                const commentDb = await Comments.create(data)
                await commentDb.save()

                if (!commentDb) {
                    reject({ error: "Couldn\'t comment! Try again." })
                }
                blog.comments.push(commentDb)
                await blog.save()
                resolve({ blog: blog })
            } catch (error) {
                reject({ error: "Error at Database!" })
            }
        })
    },
}
module.exports = BlogService