const http = require('http');
require('dotenv').config()
const express = require('express')
const app = express()
var routes = require('./routes')

const PORT = process.env.PORT || 3000;


app.use('/routes', routes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})


    console.log("test");

console.log('Server started');
