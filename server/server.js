const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

var {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validate');
var {Users} = require('./utils/users');

var app = express();
const publicPath = path.join(__dirname+'/../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('Connection is Made successfully!!');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });


  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);

    if(isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(message.from,message.text));
      callback();
    }
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(coords.from, coords.latitude, coords.longitude));
    });
  socket.on('disconnect',()=>{
    console.log('Server is disconnected');
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })
})

server.listen(port);
