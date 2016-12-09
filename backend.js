var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('draw', function(coords) {
    console.log(coords);
    socket.broadcast.emit('draw', coords);
  });
});







http.listen(8000, function() {
  console.log('Listening on 8000');
});
