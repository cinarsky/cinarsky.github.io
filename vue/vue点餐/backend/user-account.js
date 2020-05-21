const fs = require('fs')
const multer = require('multer')
// const md5 = require('md5')
const express = require('express')
// const sharp = require('sharp')
const svgCaptcha = require('svg-captcha')
const session = require('express-session')
const fsp = fs.promises
const uploader = multer({
  dest:'./upload/',
  preservePath: true,
})

//获取dbPromise的结果db
let db
//第一种方法
// const dbPromise = require('./db')
// dbPromise.then(dbObject => {
//   db = dbObject
// })
//第二种
(async function(){
  db = await require('./db')
}())

const changePasswordTokenMap = {}
// const mailer = require('./mailer')

const app = express.Router()

app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: false,
}))

// svg-captcha
app.get('/captcha', (req, res, next) => {
  var captcha = svgCaptcha.create({
    size: 4,
    noise: 5,
    width: 100,
    height:50,
    color: true,
    background: '#cc9966',
  });
  // 保存session并且不区分大小写
  req.session.captcha = captcha.text.toLowerCase()

  captchaText = captcha.text
  res.type('svg');
  res.send(captcha.data);
})


app.get('/', (req, res, next) => {
  sendFile(__dirname + '/static/index.html')
})

//register
app.route('/register')
  .post(uploader.single('avatar'), async (req, res, next) => {
    var regInfo = req.body

    console.log('register', regInfo)

    var user = await db.get('SELECT * FROM users WHERE name=?', regInfo.name)

    if(user){

      if(res.file){
        await fsp.unlink(req.file.path)
      }

      res.json({
        code:-1,
        msg: '用户名已被占用'
      })

    }else{

      await db.run('INSERT INTO users (name, email, password, title) VALUES (?,?,?,?)',
        regInfo.name, regInfo.email, regInfo.password, regInfo.title
      )

      res.json({
        code:0,
        msg:'注册成功'
      })

    }
  })

  //userInfo验证是否是登录过的用户（根据cookie）
  app.get('/userinfo', async (req, res, next) => {
    var userid = req.signedCookies.userid
    // console.log(userid)
    if(userid){
      res.json(await db.get('SELECT * FROM users WHERE id =?', userid))
    }else{
      res.json({
        cose:-1,
        msg:'不存在此餐厅'
      }) 
    }
  })

  //login登录
  app.route('/login')
    .post(async (req, res, next) => {
      var tryLoginInfo = req.body
      console.log(tryLoginInfo.name, 'trying to login!')

      if(tryLoginInfo.captcha != req.session.captcha){
        res.json({code: -1, msg: '验证码错误'})
        return
      }

      var user = await db.get('SELECT * FROM users WHERE name=? AND password=?', 
        tryLoginInfo.name, tryLoginInfo.password
      )
      
      if(user){
        // console.log('加cookies')
        res.cookie('userid', user.id, {signed:true})
        res.json({code:0, msg:'登陆成功', user})
      }else{
        console.log(tryLoginInfo, captchaText, user)
        res.json({code: -2, msg: '用户名或密码错误'})
      }
    })

    //忘记密码
    app.route('/forget')
      .post(async (req, res, next) => {
        
        //忘记密码用户ID
        var userid = await db.get('SELECT id FROM users WHERE email=?', req.body.email) 
       
        if(userid){
            var token = Math.random().toString().slice(2, 8)
            changePasswordTokenMap[token] = req.body.email
            //20分钟内删除邮箱地址
            setTimeout(() =>{
              delete changePasswordTokenMap[token]
            }, 60 * 1000 * 20)
            var link = 'http://47.96.148.104/change-password/' + token
            console.log(link)
            res.json({
              code:0,
              msg:'邮件已发送',
              path: link,
            })
            //将修改密码的地址通过邮件发给注册人
        //     mailer.sendMail({
        //       from: '810006338@qq.com',
        //       to: req.body.email,
        //       subject: '密码修改',
        //       text: link
        //     }, (err, info) => {
        //       res.json({
        //         code:0,
        //         msg:'已向您的邮箱发送验证邮件，请在20分钟内更改密码'
        //       })
        //     })
        } else {
          res.json({
            code:-1,
            msg:'没有此用户'
          })
        return 
        }
    })

    //修改密码页
    app.route('/change-password/:token')
      .post( async (req, res, next) => {
        var newPassword = req.body.password
        var email = changePasswordTokenMap[req.params.token]
        console.log(req.params.token, email, changePasswordTokenMap)
        if(email){
          await db.run('UPDATE users SET password=? WHERE email=?', newPassword, email)
          res.json({
            code:0,
            msg:'密码修改成功'
          })
        }else{
          res.json({
            code:-1,
            msg:'链接已经失效'
          })
          return 
        }  
      })

      //登出销毁cookie
      app.get('/logout', (req, res, next) => {
        res.clearCookie('userid')
        res.json({
          code:0,
          msg:'登出成功'
        })
      })


    module.exports = app
   