const path = require('path');
const express = require("express");
const app = express();

//setting
app.set('port', process.env.PORT || 3000);

//statics files
app.use(express.static(path.join(__dirname, 'public')));

//start server
const server = app.listen(app.get('port'), () => {
    console.log('puerto de server', app.get('port'));
});

//websocket
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});
