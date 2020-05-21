const path=require('path')
const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const sqlite=require('sqlite')
const bodyparser=require('body-parser')
const userAccountMiddleware=require('./user-account')
const http=require('http')
const app=express()
const server=http.createServer(app)
const io=require('socket.io')
const ioServer =io(server)
global.ioServer=ioServer
const restaurantMiddleware=require('./restaurant')
console.log(__dirname)
const port=5000

app.use(cors({
    origin:true,
    allow:true,
    maxAge:86400,
    credentials:true,
}))

app.use(cookieParser())
app.use(express.static(__dirname+'/static'))
app.use('/upload',express.static(__dirname+'/upload'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use('/api',userAccountMiddleware)
app.use('/api',restaurantMiddleware)
server.listen(5000,()=>{
    console.log('listening at',port)
})
 