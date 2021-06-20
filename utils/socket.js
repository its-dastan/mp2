const redisAdapter = require('socket.io-redis')
const { BlogService } = require('../api/services')

const globalConnection = []

const Socket = {
    async init(server) {
        try {
            // Enable the socket server
            const io = require('socket.io')(server, {
                cors: { origin: '*' }
            })
            io.on('connection', async (socket) => {
                globalConnection.push(socket)
                console.log(socket.id);
                // console.log('A new user joined');
                console.log(globalConnection.length);
                // socket.disconnect()


                // Turn on the sockets
                socket.on('global', async () => {

                    setInterval(async () => {
                        //get the blogs
                        let blogs = await BlogService.getBlogs()

                        console.log(blogs);

                        // Emit the message from the server
                        io.emit('globalUpdate', blogs)
                    }, 5000)
                })
            })
        } catch (error) {
            console.log('socket server error', error);
        }
    }
}

module.exports = Socket;