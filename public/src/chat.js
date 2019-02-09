var socket = io();
var name;
var members = [];

socket.on('connect',()=>{
  console.log('Connected to the server');
  var params = jQuery.deparam(window.location.search);
  name = params.name;
  socket.emit('join', params, function (err) {
  if (err) {
    alert(err);
    window.location.href = '/';
  } else {
    console.log('No error');
  }
  });
})

socket.on('disconnect',()=>{
  console.log('User is Disconnected');
})

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('newLocationMessage', function (message) {
  var time = moment(message.createdAt).format("h:mm a");
  var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: time
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newMessage', function (message) {
  var time = moment(message.createdAt).format("h:mm a");
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: time
  });

  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

socket.emit('createMessage', {
    from:name,
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
