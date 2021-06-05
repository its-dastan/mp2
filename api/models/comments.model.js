const moment = require('moment')
const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema({
    comment: {
        type: String,
        default: null
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blogs'
    },
    comment_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commented_at: {
        type: Date,
        default: moment().format()
    }
})

const Comments = mongoose.model('Comments', CommentSchema)
module.exports = Comments