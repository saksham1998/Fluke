var socket = io();

socket.on('connect',()=>{
  console.log('Connected to the server');

  socket.emit('createMessage',{
    from:'john',
    data:'have a pleasent eve'
  })
})

socket.on('newMessage',(data)=>{
  console.log(data);
})

socket.on('disconnect',()=>{
  console.log('User is Disconnected');
})
