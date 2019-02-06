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

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

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

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
