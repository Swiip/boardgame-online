var express = require('express'), socketio = require('socket.io');

var app = express.createServer();

// app.use(express.logger());

app.get('/', function(req, res, next) {
    req.url = "/index.html";
    next();
});

app.use(express["static"](__dirname + '/public'));

app.listen(process.env.C9_PORT || process.env.VMC_APP_PORT || 3000);

var io = socketio.listen(app);

if (process.env.VMC_APP_PORT) {
    io.set('transports', [
    // 'websocket',
    // 'flashsocket',
    // 'htmlfile',
    'xhr-polling', 'jsonp-polling' ]);
}

var pieces = {};

io.sockets.on("connection", function(socket) {
    socket.on("init", function() {
        console.log(pieces);
        socket.emit("init", pieces);
    });

    socket.on("move", function(message) {
        if(!pieces[message.id]) {
            pieces[message.id] = {};
        }
        pieces[message.id].top = message.top;
        pieces[message.id].left = message.left;
        console.log(pieces);
        socket.broadcast.emit("move", message);
    });

    socket.on("face", function(message) {
        if(!pieces[message.id]) {
            pieces[message.id] = {};
        }
        pieces[message.id].face = message.face;
        socket.broadcast.emit("face", message);
    });
});
