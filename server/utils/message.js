var generateMessage = (from,data)=>{
  return {
    from,
    data,
    createdAt:new Date()
  }
}

module.exports = {
  generateMessage
}
