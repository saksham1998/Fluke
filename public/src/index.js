var socket = io();

socket.on('connect',()=>{
  console.log('Connected to the client');

  socket.emit('createMessage',{
    name:'saksham',
    data:'hey, is it working?'
  })
})

socket.on('newMessage',(data)=>{
  console.log(data);
})
