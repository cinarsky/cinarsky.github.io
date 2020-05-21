const path = require ('path')
const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const sqlite = require('sqlite')
const userAccountMiddleware = require('./user-account')

const othersMiddleware = require('./others')

const app = express()

const port = 802
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')
const ioServer = io(server)
global.ioServer = ioServer

const restaurantMiddleware = require('./restaurant')

app.use((req, res, next) => {
  req.global = req.protocol + '://' + req.get('host') + '/'
  console.log(req.method, req.url, req.global)
  next()
})

app.use(cors({
  allow: true,
  maxAge: 86400,
  credentials:true,
  origin: 'http://localhost:8080',
  preflightContinue: true,
  optionsSuccessStatus: 200,
}))

app.use(cookieparser('secret'))

//静态文件夹
app.use(express.static(__dirname + '/static/'))
app.use('/upload', express.static(__dirname + '/upload/'))

app.use(express.urlencoded({extended: true}))//解析扩展url编码的请求体
app.use(express.json())//用来解析json请求体的中间件，(axios默认发json)

//user-account中间件
app.use('/api',userAccountMiddleware)

app.use('/api',restaurantMiddleware)

app.use(othersMiddleware)


server.listen(port, () => console.log('server listening on port', port))



