const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

var app = express();
const publicPath = path.join(__dirname+'/../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('Connection is Made successfully!!');

  socket.emit('newMessage',{
    name:'Admin',
    data:'Welocome to the chat room!'
  })
  socket.broadcast.emit('newMessage',{
    name:'Admin',
    data:'New User Joint!!!',
    createdAt:new Date()
  })

  socket.on('createMessage',(message)=>{
    io.emit('newMessage',{
      name:message.name,
      data:message.data,
      createdAt:new Date()
    })
  })

  socket.on('disconnect',()=>{
    console.log('Server is disconnected');
  })
})

server.listen(port,()=>{
  console.log('Server is up and running!');
});
