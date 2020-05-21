const fs = require('fs')
const multer = require('multer')
const md5 = require('md5')
const express = require('express')
// const sharp = require('sharp')
// const svgCaptcha = require('svg-captcha')
const fsp = fs.promises
const uploader = multer({
  dest: './upload/',
  preservePath: true,
})

let db
(async function(){
  db = await require('./db')
}())

const changePasswordTokenMap = {}
const mailer = require('./mail')

const app = express.Router()

app.route('/register')
  .post(uploader.single('avatar'), async (req, res, next) => {
    var regInfo = req.body

    var user = await db.get('SELECT * FROM users WHERE name=?', regInfo.name)

    if (user) {

      if (req.file) {
        await fsp.unlink(req.file.path)
      }

      res.status(401).json({
        code: -1,
        msg: '用户名已被占用'
      })

    } else {
      await db.run('INSERT INTO users (name, email, password, title) VALUES (?,?,?,?)',
        regInfo.name, regInfo.email, regInfo.password, regInfo.title
      )

      res.json({
        code: 0,
        msg: '注册成功'
      })
    }
  })

// app.get('/captcha', (req, res, next) => {
//   var captcha = svgCaptcha.create({
//     ignoreChars: '0o1il'
//   })
//   res.type('svg')
//   console.log(captcha.text)
//   req.session.captcha = captcha.text

//   res.end(captcha.data)
// })

app.get('/userinfo', async (req, res, next) => {
  var userid = req.cookies.userid
  console.log(req.cookies)
  if (userid) {
    var user = await db.get('SELECT id,name,title FROM users WHERE id=?', Number(userid))
    // console.log('user: ', user)
    ///////////////????///////////////////////////
    res.json(user)
  } else {
    res.status(404).json({
      code: -1,
      msg: '不存在此餐厅'
    })
  }
})
app.post('/userinfo', async (req, res, next) => {
  var userid = req.body.rid
  // console.log(req.cookies)
  if (userid) {
    var user = await db.get('SELECT id,name,title FROM users WHERE id=?', Number(userid))
    // console.log('user: ', user)
    ///////////////????///////////////////////////
    res.json(user)
  } else {
    res.status(404).json({
      code: -1,
      msg: '不存在此餐厅'
    })
  }
})

app.route('/login')
// 利用cookie登录
  .post(async (req, res, next) => {
    var tryLoginInfo = req.body

    var user = await db.get('SELECT id, name, title FROM users WHERE name=? AND password=?',
      tryLoginInfo.name, tryLoginInfo.password
    )

    if (user) {
      res.cookie('userid', user.id)
      res.json(user)
    } else {
      res.status(403).json({code: -1, msg: '用户名或密码错误'})
    }
  })

app.route('/forgot')
  .post(async (req, res, next) => {
    var email = req.body.email
    var user = await db.get('SELECT * FROM users WHERE email=?', email)
    if (!user) {
      res.json({
        code: -1,
        msg: '不存在此用户'
      })
    }

    var token = Math.random().toString().slice(2)

    changePasswordTokenMap[token] = email

    setTimeout(() => {
      delete changePasswordTokenMap[token]
    }, 60 * 1000 * 20)//20分钟后删除token

    var link = `http://localhost:3005/change-password/${token}`

    console.log(link)

    mailer.sendMail({
      from: '"点餐系统" <965183198@qq.com>',
      to: email,
      subject: '密码修改',
      text: link
    }, (err, info) => {
      res.json({
        code: 0,
        msg: '已向您的邮箱发送密码重置链接，请于20分钟内点击链接修改密码！'
      })
    })
  })

app.route('/change-password/:token')
  .post(async (req, res, next) => {
    var token = req.params.token
    var email = changePasswordTokenMap[token]
    var password = req.body.password

    if (!email) {
      res.json({
        code: -1,
        msg: '链接已失效'
      })
      return
    }

    delete changePasswordTokenMap[token]
    
    await db.run('UPDATE users SET password=? WHERE email=?', md5(md5(password)), email)

    res.end({
      code: 0,
      msg: '密码修改成功'
    })
  })

app.get('/logout', (req, res, next) => {
  res.clearCookie('userid')
  res.json({
    code: 0,
    msg: '登出成功'
  })
})

module.exports = app
