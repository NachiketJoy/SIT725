module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.emit('newMessage', {
            from: 'Joy',
            text: 'A text message!'
        })

        socket.on('createMessage', (message) => {
            console.log('createMessage', message);
        })

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
    });
}