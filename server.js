const app = require('./api/app')
const http = require('http')
const cluster = require('cluster')

if (cluster.isMaster) {
    const numWorkers = require('os').cpus().length

    console.log('Master cluster setting up' + numWorkers + ' workers')
    const server = http.createServer()
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

    const server = http.createServer(app)

    server.listen(PORT, () => {
        console.log(`Server Runiing at : ${PORT}`);
    })
}