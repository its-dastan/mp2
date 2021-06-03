const moment = require('moment')
const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        Default: moment().format()
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User