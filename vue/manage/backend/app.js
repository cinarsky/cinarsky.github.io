const express = require('express')
const app = express()
const sqlite = require('sqlite')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
// const bodyparser=require('body-parser')
const port = 5666
const dbPromise = sqlite.open(__dirname + '/db/manage.db', {
    Promise
});
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors({
    origin: true,
    allow: true,
    maxAge: 86400,
    credentials: true,
}))
app.use(cookieParser())




// 注册
app.route('/api/create')
.post(async(req,res)=>{
    console.log(req.body)
    var name=req.body.name
    var pass=req.body.pass
    var departs=req.body.departs
    var age=Number(req.body.age)
    var sex=req.body.sex=='男'?1:0
    var desc=req.body.desc
    console.log(sex)
    var user=await db.get('SELECT * FROM users where name =?',name)
    if(user){
        res.json({
            code: -1,
            msg: '用户名已被占用'
          })
    }else{
    await db.run(`
    INSERT INTO users (name, password,departs,age,sex,desc)
      VALUES (?,?,?,?,?,?)
  `, name, pass,departs,age,sex,desc)
  res.json({
    code: 200,
    msg: '注册成功'
  })
}
//     var user=await db.get('SELECT * FROM users where name =? and password = ?',uName, uPassword)
//     console.log(user)
//     res.send(user)      
// }
})

// 登录
app.route('/api/login')
.get(async(req,res)=>{
    var user=await db.get('SELECT * FROM users where id = ?',Number(req.cookies.userid))
    if(user){
        res.send(user)
    }
    else{
        res.json({
            code: -1,
            msg: '未登陆过'
          })
    }
    
})
    .post(async(req,res)=>{
        console.log(req.body)
        var name=req.body.name
        var pass=req.body.pass
        var user=await db.get('SELECT * FROM users where name = ? and password = ?',name,pass)
        if(user){
            res.cookie('userid', user.id)
            res.json({
                code: 200,
                msg: '登录成功'
              })
        }else{
            res.json({
                code: -1,
                msg: '用户名或密码错误'
              })
        }
    })


dbPromise.then(dbObject => {
    db = dbObject
    app.listen(port, () => {
        console.log('server listening at' + port)
    })
})