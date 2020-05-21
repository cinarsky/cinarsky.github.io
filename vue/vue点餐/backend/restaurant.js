const express = require('express')
const multer = require('multer')
const path = require('path')

//multer函数用来上传文件
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    console.log(file.name, path.extname(file.originalname))
    cb(null, Date.now() + file.originalname) //Appending img
  }
})
const uploader = multer({storage: storage})

let db
(async function(){
  db = await require('./db')
}())

const app = express.Router()


//socket.io部分
// 用来存储每一桌多少客人在点餐
var customRoomInfo = {}

ioServer.on('connection', socket => {
  socket.on('select room', roomid => {
    console.log('manage room',roomid)
    //服务器端接入房间roomid
    socket.join(`/restaurant/${roomid}`)
  })

  // 客户点菜房间
  socket.on('customer room', roomInfo => {
    var roomName = `/restaurant/${roomInfo.rid}/desk/${roomInfo.did}`
    console.log('customer room',roomName)
    socket.join(roomName)
    if(roomInfo.customCount){
      if(!customRoomInfo[roomName]) {
        customRoomInfo[roomName] = []
      }
      customRoomInfo[roomName].push(roomInfo.customCount)
      console.log(customRoomInfo)
    }
  })

  // 客户点单，删除customRoomInfo中socket点菜房间人数的数组
  socket.on('order', roomInfo => {
    var roomName = `/restaurant/${roomInfo.rid}/desk/${roomInfo.did}`
    console.log('order leave room', roomName)
    customRoomInfo[roomName].length = 0
  })
})

// 顾客端部分选就餐人数landing页面部分
// 根据连入同一socket房间的人数决定landing页面是否跳转到点餐页面foodCart
app.get('/landing/r/:rid/d/:did/custom', (req, res, next) => {
    var roomName = `/restaurant/${req.params.rid}/desk/${req.params.did}`
    if(customRoomInfo[roomName] && customRoomInfo[roomName].length > 0){
      res.json({
        code: 1,
        msg: customRoomInfo[roomName][0],
      })
    }else{
      res.json({
        code: 0,
        msg: 'stay',
      })
    }
})


//查找桌面信息，例如deskinfo?rid=5&did=8 使用req.query属性
// CREATE TABLE desks (
//   id integer primary key,
//   rid integer not null,
//   name string not null,
//   capacity integer);
app.get('/deskinfo', async (req, res , next) => {

  // console.log(req.query.did)

  var desk = await db.get(`
  SELECT
    desks.rid as did,
    users.id as uid, 
    desks.name,
    users.title
    FROM desks JOIN users 
    ON desks.rid=users.id 
    WHERE desks.id=? AND users.id=?
   `, req.query.did, req.query.rid)

  res.json(desk)
})



//桌面管理api
app.route('/restaurant/:rid/desks')
  .get(async (req, res, next) => {
    //获取桌面信息
    var deskList = await db.all('SELECT * FROM desks WHERE rid=?',
    req.signedCookies.userid)
    res.json(deskList)
  })
  .post(async (req, res, next) => {
    //增加一个桌子
    var restaurant = await db.all('SELECT * FROM users WHERE id=?',
    req.cookies.userid)
    
    if(restaurant){

      await db.run('INSERT INTO desks (rid, name, capacity) VALUES (?,?,?) ',
      req.signedCookies.userid, req.body.name, req.body.capacity)
      res.json({
        code:0,
        msg:`成功增加一张${req.body.capacity}人桌`
      })
      var latestDesk = await db.get(`SELECT * FROM desks WHERE rid=? ORDER BY id DESC`,
        req.signedCookies.userid)
      console.log(latestDesk)
      ioServer.emit('add desk', latestDesk)

    }else{
      res.json({
        code:-1,
        msg:'不存在此餐厅'
      })
    }
  })

// 删除一个桌子或者修改桌面信息
app.route('/restaurant/:rid/desk/:did')
  // 删除
  .delete(async (req, res, next) => {
    var desk = await db.get('SELECT * FROM desks WHERE rid=? AND id=?',
    req.params.rid, req.params.did)

    if(desk){
      await db.run('DELETE FROM desks WHERE id=? AND rid=?',
      req.params.did, req.params.rid)
      res.json({
        code:0,
        msg:`成功删除一张${desk.capacity}人桌`
      })
      var deskLists = await db.all(`SELECT * FROM desks WHERE rid=?`, req.signedCookies.userid)
      ioServer.emit('change desk', deskLists)

    }else{
      res.json({
        cose:-1,
        msg:'不存在该桌或者已经被删除'
      })
    }
  })
  // 修改桌面信息
  .put(async (req, res, next) => {
    var desk = await db.get('SELECT * FROM desks WHERE rid=? AND id=?',
    req.params.rid, req.params.did)

    var newName = req.body.name ? req.body.name : desk.name 
    var newCapacity = req.body.capacity ? req.body.capacity : desk.capacity
    
    if(desk){
      await db.run(`UPDATE desks SET name=?, capacity=? WHERE id=? AND rid=?`,
      newName, newCapacity, req.params.did, req.signedCookies.userid)
      res.json({
        code:0,
        msg:`成功更新桌面信息`
      })
      var deskLists = await db.all(`SELECT * FROM desks WHERE rid=?`, req.signedCookies.userid)
      ioServer.emit('change desk', deskLists)

    }else{
      res.json({
        cose:-1,
        msg:'不存在该桌或者已经被删除'
      })
    }
  })




//某餐厅菜单管理api
// CREATE TABLE users (
//   id integer primary key,
//   name string not null,
//   password string not null,
//   email string,
//   title string not null);
app.get('/menu/restaurant/:rid', async(req, res, next) => {
    var menu = await db.all(`SELECT * FROM foods WHERE rid=?`, req.params.rid)
    // console.log(menu)
    res.json(menu)
})


app.route('/restaurant/:rid/food')
  .get(async(req, res, next)=> {
//获取所有菜品列表用于在页面中展示
   var foodList = await db.all('SELECT * FROM foods WHERE rid=?',req.params.rid)
    // console.log(foodList)
    res.json(foodList)
  })
  .post(uploader.single('img'), async (req, res, next) => {
    // console.log(req.file)
//增加一个菜品
    // console.log(req.signedCookies.userid, req.body.name, req.body.price, req.body.category, req.body.desc, req.body.status)
    await db.run(`
        INSERT INTO foods (rid, name, price, category, desc, status, img) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,req.signedCookies.userid, req.body.name, req.body.price, req.body.category, req.body.desc, req.body.status, req.file.filename)
    var foods = await db.get('SELECT * FROM foods ORDER BY id DESC LIMIT 1')
    // console.log(foods)
    res.json(foods)
  })


//菜品修改管理api
  app.route('/restaurant/:rid/food/:fid')
  // CREATE TABLE foods (
  //   id integer primary key,
  //   rid integer not null,
  //   name string not null,
  //   desc string,
  //   price integer not null,
  //   img string,
  //   category string,
  //   status string not null);
  .delete(async (req, res, next) => {
//删除一个food
  // console.log(req.params.rid)
    var food = await db.get('SELECT * FROM foods WHERE id=? AND rid=?',
    req.params.fid, req.signedCookies.userid)
  // console.log(food)
    if(food){

    await db.run('DELETE FROM foods WHERE id=? AND rid=?',
    req.params.fid, req.signedCookies.userid)
    
    res.json({
      code:0,
      msg:`您已成功删除${food.name}菜品`
    })

    }else{

      res.status(401).json({
        code:-1,
        msg:'无此菜品或者您无权对此菜品进行操作'
      })

    }
  })
  .put(uploader.single('img'), async (req, res, next) => {
    // console.log(req.file)
//修改一个food
    var food = await db.get('SELECT * FROM foods WHERE id=? AND rid=?',
    req.params.fid, req.signedCookies.userid)
    // console.log( req.body)
    var newPrice = req.body.price ? req.body.price : food.price
    var newStatus = req.body.status ? req.body.status : food.status
    var newName = req.body.name ? req.body.name : food.name
    var newDesc = req.body.desc ? req.body.desc : food.desc
    var newCategory = req.body.category ? req.body.category : food.category
    var newImg = req.file ? req.file.filename : food.img
    
    
    if(food){
      await db.run(`
      UPDATE foods SET price=?, status=?, name=?, desc=?, category=?, img=?
      WHERE id=? AND rid=?
      `,
      newPrice, newStatus, newName, newDesc, newCategory, newImg, req.params.fid, req.signedCookies.userid)
      
      res.json({
        code:0,
        msg:'修改成功'
      })

    }else{

      res.json({
        code:-1,
        msg:'无此菜品或者您无权限执行此操作'
      })
    }

  })


//客户下单
// CREATE TABLE orders (
//   id integer primary key,
//   rid integer not null,
//   did integer not null,
//   deskName string not null,
//   customCount integer not null,
//   details string not null,
//   status string,
//   timestamp string not null);
app.route('/restaurant/:rid/desk/:did/order')
  .post(async(req, res, next) => {
    var rid = req.params.rid
    var did = req.params.did
    var deskName = req.body.deskName
    var totalPrice = req.body.totalPrice
    var customCount = req.body.customCount
    var details = JSON.stringify(req.body.foods)
    var status = 'pending' // confirmed/completed
    var timestamp = new Date().toISOString()
  
    await db.run(`
      INSERT INTO orders (rid, did, deskName,totaLPrice, customCount, details, status, timestamp)
      VALUES (?,?,?,?,?,?,?,?)
    `, rid, did, deskName, totalPrice, customCount, details, status, timestamp)
    var order = await db.get('SELECT * FROM orders WHERE rid=? AND did=? ORDER BY id DESC',
    req.params.rid,req.params.did)
    ioServer.in(`/restaurant/${rid}`).emit('new order', order)
    ioServer.in(`/restaurant/${rid}/desk/${did}`).emit('submit order', order)
    if(order){
      res.json({
        code: 0,
        msg: '订单数据存入成功',
      })
    }else{
      res.json({
        code: -1,
        msg: '订单录入失败',
      })
    }
  })
  .get(async(req, res, next) => {
    var historyOrder = await db.all('SELECT * FROM orders WHERE rid=? AND did=? AND (status="pending" OR status="confirmed") ORDER BY id DESC',
    req.params.rid,req.params.did)
    if(historyOrder) {
      res.json(historyOrder)
    } else {
      res.json({
        code: -1,
        msg: '该桌无正在进行的订单',
      })
    }
  })
  
// order-success页面数据
app.get(`/restaurant/:rid/desk/:did/order-success`, async (req, res, next) => {
  var order = await db.get('SELECT * FROM orders WHERE rid=? AND did=? ORDER BY id DESC',
    req.params.rid,req.params.did)
    order.details = JSON.parse(order.details)
    // console.log(order)
    if(order){
      res.json(order)
    }else{
      res.json({
        code: -1,
        msg: "获取数据失败",
      })
    }
})

  
//initData 点菜页面初始值
app.get(`/restaurant/:rid/desk/:did/temporder`, async (req, res, next) => {
    var initData = await db.all(`SELECT * FROM temporder WHERE rid=? AND did=?`, 
    req.params.rid, req.params.did)
    console.log(initData)
    if(initData){
      res.json(initData)
    }else{
      res.end('-1')
    }
  })



//订单管理
app.route('/restaurant/:rid/order')
  .get(async (req, res, next) => {
    var orders = await db.all('SELECT * FROM orders WHERE rid=? ORDER BY timestamp DESC', req.signedCookies.userid)
    console.log(orders, req.signedCookies.userid)
    orders.forEach(order => {
      order.details = JSON.parse(order.details)
    })
    console.log(orders)
    res.json(orders)
  })

//删除订单或者修改订单状态
app.route('/restaurant/:rid/order/:oid')
  //删除订单
  .delete(async(req, res, next) => {
    var order = await db.get('SELECT * FROM orders WHERE id=? AND rid=?',
    req.params.oid, req.params.rid)

    if(order){
      await db.run('DELETE FROM orders WHERE id=? AND rid=?',
    req.params.oid, req.params.rid)

    var changedOrderList = await db.all('SELECT * FROM orders WHERE rid=? ORDER BY timestamp DESC',
    req.params.rid)
    // console.log(changedOrderList)
    ioServer.emit('change order', changedOrderList)
      res.json({
        code:0,
        msg:'成功删除订单'
      })

    }else{
      res.status(401).json({
        code:-1,
        msg:'没有权限'
      })
    }
  })
// 修改订单
  .put(async(req, res, next) => {
    var order = await db.get('SELECT * FROM orders WHERE id=? AND rid=?',
    req.params.oid, req.params.rid)

    if(order){
      var rid = req.params.rid
      var oid = req.params.oid
      var details = JSON.stringify(req.body.foods) ? JSON.stringify(req.body.foods) : order.details
      var totalPrice = req.body.totalPrice ? req.body.totalPrice : order.totalPrice
      var status = req.body.status ? req.body.status : order.status
      await db.run('UPDATE orders SET details=?, totalPrice=?, status=? WHERE id=? AND rid=?',
      details, totalPrice, status, oid, rid)

      var changedOrderList = await db.all('SELECT * FROM orders WHERE rid=? ORDER BY timestamp DESC',
      req.params.rid)
      // console.log(changedOrderList)
      ioServer.emit('change order', changedOrderList)

      res.json({
        code:0,
        msg:'更新成功'
      })
    }else{
      res.json({
        code:-1,
        msg:'没有权限'
      })
    }
  })

var orderDetails = {}

// 订单详情页的数据缓存
app.route('/r/:rid/o/:oid')
  .post((req, res, next) => {
    var orderName = `r/${req.signedCookies.userid}/o/${req.params.oid}`
    orderDetails[orderName] = req.body
    res.json({
      code: 0,
      msg: '订单缓存存入成功'
    })
  })
  .get((req, res, next) => {
    var orderName = `r/${req.signedCookies.userid}/o/${req.params.oid}`
    var orderInfo = orderDetails[orderName]
    if(orderInfo){
      res.json(orderInfo)
    }else{
      res.json({
        code: -1,
        msg: '未读取到该订单缓存'
      })
    }
    delete orderDetails.orderName
  })

// 客户点餐同步后台接口
  app.route('/restaurant/:rid/desk/:did/custom')
  .put(async(req, res, next) => {
    const cartFood = req.body
    // console.log(cartFood)
    ioServer.in(`/restaurant/${req.params.rid}/desk/${req.params.did}`).emit('change order', cartFood)
    var tempData = await db.get(`SELECT * FROM temporder WHERE rid=? AND did=? AND fid=?`,
      req.params.rid, req.params.did, cartFood.fid)
    if(tempData){
      await db.run('UPDATE temporder SET count=? WHERE rid=? AND did=? AND fid=?',
        cartFood.count, req.params.rid, req.params.did, cartFood.fid)
    }else{
      await db.run(`INSERT INTO temporder (rid, did, fid, count) VALUES (?, ?, ?, ?)`,
        req.params.rid, req.params.did, cartFood.fid, cartFood.count)
    }
    res.json({
      code: 0,
      msg: ''
    })
  })
  .delete(async(req, res, next) => {
    await db.run(`DELETE FROM temporder WHERE rid=? AND did=?`, req.params.rid, req.params.did)
    res.json({
      code: 0,
      msg: '删除临时数据'
    })
  })


module.exports = app