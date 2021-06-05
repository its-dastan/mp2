const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const BlogSchema = new Schema({
    caption: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    video: {
        type: String,
        default: null
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Likes'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    created_date: {
        type: Date,
        default: moment().format()
    },
    posted_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Blogs = mongoose.model('Blogs', BlogSchema)
module.exports = Blogs