const path = require('path');
const express = require('express');

var app = express();
const publicPath = path.join(__dirname+'/../public');
const port = process.env.PORT || 3000;

console.log(publicPath);
app.use(express.static(publicPath))

app.listen(port,()=>{
  console.log("server is up and running!")
})
