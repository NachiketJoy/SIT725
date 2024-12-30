module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        // A welcome message to new user
        socket.emit('newMessage', {
            from: 'Admin',
            text: 'Welcome to the chat app!',
            createdAt: new Date().toISOString(),
        });

        // Notify others about new user
        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'New user joined',
            createdAt: new Date().toISOString()
        })

        // Message from client side
        socket.on('chatMessage', (msg) => {
            io.emit('newMessage', {
                from: `User ${socket.id}`,
                text: msg,
                createdAt: new Date().getTime()
            })
        });

        // User disconnect
        socket.on('disconnect', () => {
            console.log('a user disconnected', socket.id);
        });
    });
}