const io=require('socket.io')
const httpServer=require('./http-server')
var ioServer=io(httpServer)
module.exports=ioServer