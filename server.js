var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("testing sockets");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: '+ socket.id);

socket.on('textsending', textReceive);

function textReceive(data){
  socket.broadcast.emit('textsending',data);
  // io.socket.emit('textsending',data);

  ///// a message that comes in can be altered/renamed/changed/....

  console.log(data);
}

}
