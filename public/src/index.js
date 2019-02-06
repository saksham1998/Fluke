var socket = io();

socket.on('connect',()=>{
  console.log('Connected to the server');
})

socket.on('newMessage',(data)=>{
  console.log(data);
})

socket.on('disconnect',()=>{
  console.log('User is Disconnected');
})

socket.on('newMessage', function (message) {
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

socket.emit('createMessage', {
    from: 'User',
    text: $(".message").val()
  }, function () {
  });
});
