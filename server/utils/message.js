var moment = require('moment');

var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt:moment.valueOf()
  }
}
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?@${latitude},${longitude},15z`,
    createdAt: moment.valueOf()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
}
