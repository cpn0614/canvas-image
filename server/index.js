const express = require('express')
const http = require('http')


const app = express()
const config = {
  port: 3000,
  host: 'localhost'
}

app.use(express.static('./view'))
app.use('/lib', express.static('./lib'))

// app.addListener()
http.createServer(app).listen(config.port, config.host, () => {
  console.log("listening at http://%s:%s", config.host, config.port)
})