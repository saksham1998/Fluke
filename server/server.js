const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

var {generateMessage,generateLocationMessage} = require('./utils/message');

var app = express();
const publicPath = path.join(__dirname+'/../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('Connection is Made successfully!!');

  socket.emit('newMessage',generateMessage('Admin','Welocme To the Chat Room'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Connected'));

  socket.on('createMessage',(message,callback)=>{
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
  socket.on('disconnect',()=>{
    console.log('Server is disconnected');
  })
})

server.listen(port);
