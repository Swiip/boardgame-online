var express = require('express'),
    socketio = require('socket.io');


var app = express.createServer();

//app.use(express.logger());

app.get('/', function(req, res, next){
    req.url = "/index.html";
    next();
});

app.use(express["static"](__dirname + '/public'));

app.listen(process.env.C9_PORT || process.env.VMC_APP_PORT || 3000);

var io = socketio.listen(app);

if(process.env.VMC_APP_PORT) {
    io.set('transports', [
        //'websocket',
        //'flashsocket',
        //'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]);
}

io.sockets.on("connection", function (socket) {
	var pieces = {};
	
	socket.on("init", function() {
		socket.emit("init", pieces);
	});
	
    socket.on("move", function (message) {
        pieces[message.id] = message;
        socket.broadcast.emit("move", message);
    });
});
