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
  var time = moment(message.createdAt).format("h:mm a");
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${time}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

socket.on('newMessage', function (message) {
var time = moment(message.createdAt).format("h:mm a");
  var li = $('<li></li>');
  li.text(`${message.from} ${time}: ${message.text}`);

  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

socket.emit('createMessage', {
    from: 'User',
    text: $("[name=message]").val()
  }, function () {
    $("[name=message]").val('')
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled','disabled').text('Sending Location......');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  });
});
