const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const { AuthRoutes, UserRoutes, BlogRoutes } = require('./routes')

// Define the express application
const app = express()

app.use(express.static('public'))


// Open Mongoose Connection to db
require('../db')

// Cors middleware for origin and headers
app.use(cors());

// Addin the body-parser middleware to only handle JSON and URLEncoded data
app.use(express.json())

// Use morgan for logging every request status on console
app.use(morgan('dev'))



// Correct REST naming
app.use('/api/auths', AuthRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/blogs', BlogRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    // res.send("Hello world")
    // res.sendFile('views/index.html')
})

// app.post('/getData', (req, res) => {
//     res.send(req.body)
//     console.log(req.body);
// })

// Middleware To hadle the invalid routes
app.use((req, res, next) => {
    const error = new Error('404 not found')
    next(error)
})

// Middleware To handle the error
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.use(compression)

module.exports = app