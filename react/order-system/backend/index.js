const app = require('./app')
const server = require('./http-server')
const port = 5000
server.on('request', app)
server.listen(port, () => {
  console.log('server listening on port', port)
})
