require('dotenv').config()
const express = require('express')
const app = express()
var api = require('./api') // separate route for organization
var helmet = require('helmet') // adds security headers by default
const rateLimit = require('./rateLimiter.js')
const PORT = process.env.PORT || 3000;


app.use(helmet())
app.use('/api', api)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})


console.log('Server started');
