const express=require('express')
const app=express()   
const sqlite =require ('sqlite')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const path = require('path')
const multer = require('multer')
const transporter = require('./mail.js')
// const bodyparser=require('body-parser')
const port=5002
const host='localhost'
const dbPromise = sqlite.open(__dirname+'/db/find.db', { Promise }); 
var createUserTokenMap={}
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors({
    origin:true,
    allow:true,
    maxAge:86400,
    credentials:true,
}))
app.use(cookieParser())
app.use(express.static(__dirname+'/static'))
app.use('/upload',express.static(__dirname+'/upload'))
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/upload/')
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  const uploader = multer({storage: storage})





// 登录
app.route('/login')
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
    var password=req.body.password
    var user=await db.get('SELECT * FROM users where name = ? and password = ?',name,password)
    if(user){
        res.cookie('userid', user.id)
        res.end()
    }else{
        res.json({
            code: -1,
            msg: '用户名或密码错误'
          })
    }
})
.put(uploader.single('img'), async (req, res) => {
    var img=''
    if(req.file){
         img=req.file.filename
    }
    var uid=req.cookies.userid
    var user=await db.run('update  users set avatar = ? where id = ? ',img,uid)
    console.log(user)
    if(user){
        res.json({
            code: 0,
            msg: '创建成功',
            avatar:img
          })
    }else{
        res.json({
            code: -1,
            msg: '创建失败'
          })
}
})
//登出
app.get('/logout', (req, res, next) => {
    res.clearCookie('userid')
    res.json({
      code: 0,
      msg: '登出成功'
    })
  })
// 创建用户
app.route('/create')
.get(async(req,res)=>{
    // var user=await db.all('SELECT * FROM users ')
    // res.send(user)
})
.post(async(req,res)=>{
    console.log(req.body)
    var uName=req.body.name
    var uPassword=req.body.password
    var uEmail=req.body.email
    var user=await db.get('SELECT * FROM users where name =?',uName)
    console.log(user)
    if(user){
        res.json({
            code: -1,
            msg: '用户名已被占用'
          })
    }else{
    await db.run(`
    INSERT INTO users (name, email, password)
      VALUES (?,?,?)
  `, uName, uEmail, uPassword)
   
    var user=await db.get('SELECT * FROM users where name =? and password = ?',uName, uPassword)
    console.log(user)
    res.send(user)      
}
})
// 获取验证码
app.route('/getcode')
.post(async(req,res)=>{
    var name=req.body.name
    var email=req.body.email
    var user=await db.get('SELECT * FROM users where name=? and email = ?',name,email)
    if(user){
        var codetoken = Math.random().toString().slice(2, 8)
        createUserTokenMap[name] = codetoken
        setTimeout(() => {
            delete createUserTokenMap[name]
        }, 1000 * 60 * 3);

        var mailopt1 = {
            from: '"拼室友" <965183198@qq.com>', // sender address
            to: [email,'cinarsky@sina.com'], // list of receivers
            subject: '欢迎新用户，请查看验证码', // Subject line
            // 发送text或者html格式
            // text: 'Hello world?', // plain text body
            html: `<b>Welcome  ${name}</b><br>
                   <h5>拼室友验证码：${codetoken}</h5>` // html body
        }
        transporter.sendMail(mailopt1, (error, info) => {
            if (error) {
                return console.log(error);
            }else{
                res.send('已发送')
            }
            // console.log('Message sent: %s', info.messageId);
            // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
        });


    }else{
        res.json({
            code: -1,
            msg: '用户名或邮箱错误'
          })
    }
})
//更改密码
app.route('/changep')
.put(async(req,res)=>{
    var name=req.body.name
    var code=req.body.code 
    var password=req.body.password
    if(createUserTokenMap[name]==code){
         db.run(`
        update users set password = ? where name = ?
      `, password,name ).then(data=>{
          console.log(data)
          res.send('修改成功')
      })
    }else{
        res.send('验证码错误或过期')
    }
})
//创建新帖
app.route('/newarticle')
.post(uploader.single('img'), async (req, res) => {
    var img=''
    if(req.file){
         img=req.file.filename
    }
    var city=req.body.city
    var aim=req.body.aim
    var title=req.body.title
    var content=req.body.content
    var uid=req.body.uid
    var user=await db.run('insert into article (uid,date,sort,area,title,content,img) values (?,?,?,?,?,?,?)',uid,new Date().getTime(),aim,city,title,content,img)
    console.log(user)
    if(user){
        res.json({
            code: 0,
            msg: '创建成功'
          })
    }else{
        res.json({
            code: -1,
            msg: '创建失败'
          })
}
})

//获取帖子列表
app.route('/article/:sort')
.get(async(req,res)=>{
    // console.log(req)
    if(req.params.sort=='user'){
        var articles=await db.all('SELECT * FROM article where uid = ? ',req.cookies.userid)
    }
    else{
        var articles=await db.all('SELECT * FROM article where sort = ? ',req.params.sort)
    }
    res.send(articles)
})
.post(async(req,res)=>{
    var articles=await db.get('SELECT * FROM article where aid = ? ',req.body.aid)
    var user=await db.get('SELECT * FROM users where id = ? ',articles.uid)
    var comments=await db.all('SELECT * FROM comments where aid = ? ',req.body.aid)
    var zan=await db.all('SELECT * FROM zan where aid = ? ',req.body.aid)
    res.send([articles,user,comments,zan,req.cookies.userid])
})
//获取收藏帖子列表
app.route('/aid/:aid')
.get(async(req,res)=>{
    console.log(req.params.aid)
        var articles=await db.get('SELECT * FROM article where aid = ? ',req.params.aid)
        console.log(articles)
    res.send(articles)
})
// 获取个人信息
app.route('/writer')
.post(async(req,res)=>{
// 
    var user=await db.get('SELECT * FROM users where id = ?',Number(req.body.uid))
    res.send(user)
})
//评论接口
app.route('/comments')
.get(async(req,res)=>{
    // var comments=await db.all('SELECT * FROM comments where aid = ? ',req.body.aid)
    // console.log(req)
    // if(req.params.sort=='user'){
    //     var articles=await db.all('SELECT * FROM article where uid = ? ',req.cookies.userid)
    // }
    // else{
    //     var articles=await db.all('SELECT * FROM article where sort = ? ',req.params.sort)
    // }
    // res.send(articles)
})
.post(async(req,res)=>{
    var aid=req.body.aid
    var uid=req.cookies.userid
    var comment=req.body.comment
    await db.run('insert into comments (aid,uid,date,content) values (?,?,?,?)',aid,uid,new Date().getTime(),comment)
    var comments=await db.all('SELECT * FROM comments where aid = ? ',req.body.aid)
    res.send(comments)
})
//点赞接口
app.route('/zan')
.get(async(req,res)=>{
    var zan=await db.all('SELECT * FROM zan where uid = ?  and sort = ?',req.cookies.userid,2)
    
    // zan=zan.map(it=>(
    //          db.get('SELECT * FROM article where aid = ? ',it.aid)
    //    )
    // )
    console.log(zan)
    res.send(zan)
})
.post(async(req,res)=>{
    var aid=req.body.aid
    var uid=req.cookies.userid
    var sort=req.body.sort
    var zan=await db.get('SELECT * FROM zan where sort = ? and aid = ? and uid = ?',sort,aid,uid)
    if(zan){
        await db.run('delete from zan where sort = ? and aid = ? and uid = ?',sort,aid,uid)
    }
    else{
        await db.run('insert into zan (sort ,aid ,uid ) values (?,?,?)',sort,aid,uid)
    }
    var zan1=await db.get('SELECT * FROM zan where sort = ? and aid = ? and uid = ?',sort,aid,uid)
    var zan2=await db.all('SELECT * FROM zan where aid = ? ',req.body.aid)
    res.send([zan1,zan2])
})


dbPromise.then(dbObject => {
    db = dbObject
    app.listen(port, () => {
        console.log('server listening at' + port)
    })
})
