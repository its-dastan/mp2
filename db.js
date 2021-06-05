const mongoose = require('mongoose')

// Get Mongoose to global promise library to avoid error messages
mongoose.Promise = global.Promise

const dbURL = 'mongodb://localhost:27017/minor-project2'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(dbURL, options)

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connections is open');
})

mongoose.connection.on('error', (err) => {
    console.log('Mongoose Connections has an error : \n' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose Disconnected');
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose Disconnected due to app termination process.');
        process.exit(0)
    })
})