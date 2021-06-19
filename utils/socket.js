const redisAdapter = require('socket.io-redis')
const { init } = require('../api/models/auth.model')

const globalConnection = []

const Socket = {
    async init(server) {
        try {
            // Enable the socket server
            const io = require('socket.io')(server, {
                cors: { origin: '*' }
            })
            io.on('connection', async(socket => {
                globalConnection.push(socket)
                console.log('A new user joined');
                console.log(globalConnection.length);
            }))
        } catch (error) {
            console.log('socket server error', error);
        }
    }
}

module.exports = Socket;