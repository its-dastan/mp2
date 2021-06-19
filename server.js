const app = require('./api/app')
const http = require('http')
const cluster = require('cluster')
const Socket = require('./utils/socket')

if (cluster.isMaster) {
    const numWorkers = require('os').cpus().length

    console.log('Master cluster setting up' + numWorkers + ' workers')
    const server = http.createServer()
    const io = require('socket.io')(server)
    const redis = require('socket.io-redis')

    io.adapter(redis({ host: 'localhost', port: 6379 }))

    setInterval(() => {
        io.emit('data', 'payload')
    }, 1000)


    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }

    cluster.on('online', (worker) => {
        console.log('worker ' + worker.process.pid + ' is online')
    })

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ' and signal: ' + signal)
        console.log('Starting a new worker')
        cluster.fork()
    })
} else {
    const PORT = process.env.PORT || 3000

    const host = process.env.host || '0.0.0.0'

    const env = process.env.NODE_ENV

    // Creating MiscroService server
    const server = http.createServer(app)

    // Start the socket server
    const io = Socket.init(server)

    server.listen(PORT, () => {
        console.log(`🌎 Server Runiing at : ${PORT}`);
    })
}