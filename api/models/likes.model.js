const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const LikeSchema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blogs'
    },
    liked_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    liked_at: {
        type: Date,
        default: moment().format()
    }
})

const Likes = mongoose.model('Likes', LikeSchema)

module.exports = Likes