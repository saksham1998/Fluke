var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt:new Date()
  }
}
var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?@${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
}
