var express = require('express'),
    socketio = require('socket.io');


var app = express.createServer();

app.use(express["static"](__dirname + '/public'));

app.get('/', function(req, res){
    //res.send('Hello World');
    //res.render('index33', { layout: false });
});

app.listen(process.env.C9_PORT || process.env.VMC_APP_PORT || 3000);