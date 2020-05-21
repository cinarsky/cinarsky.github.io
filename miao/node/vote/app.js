const express = require('express')
const port = 3005
const app = express()
const cookieParser = require('cookie-parser')
const sqlite = require('sqlite')
const changePassworkTokenMap = {}
const createUserTokenMap = {}
const pug = require('pug')
const transporter = require('./public/mail.js')
const dbPromise = sqlite.open(__dirname + '/db/users.db')
let db
app.set('views', __dirname + '/public/template')
app.use((req, res, next) => {
    res.set("Content-Type", 'text/html; charset=UTF-8')
    next()
})
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('s'))
app.use(express.urlencoded({
    extended: true
}))




app.use(express.json())


// 登陆主界面
app.get('/', (req, res, next) => {
    req.secret = 's'
    if (req.signedCookies.user) {
        res.render('main1.pug', {
            'username': req.signedCookies.user
        })
        // res.send(
        //     `<div>
        //     <span>Welcome,${req.signedCookies.user}</span>
        //     <a href='/create'>创建投票</a>
        //     <a href='/logout'>登出</a>
        //     </div>`
        // )
    } else {
        res.render('main2.pug')
        // res.send(
        //     `<div>
        // <a href='/register'>注册</a>
        // <a href='/login'>登录</a>
        // </div>`
        // )
    }
})






// 登录页面
app.use(express.static('__dirname' + '/public'))
app.route('/login')
    .get((req, res, next) => {
        res.render('login.pug')

        // res.send(`<form action='/login' method='post'>
        // 用户名<input type='text' name='name' />

        // 密码<input type='password' name='password' />
        // <input type='submit' value='登录'></input>
        // <a href='/forgot'>忘记密码</a>
        // </form>`)
    })
    .post(async (req, res, next) => {
        req.secret = 's'
        var tryLoginUser = req.body
        var users = await db.get('select * from users where name=? and password=?', tryLoginUser.name, tryLoginUser.password)
        // var ind = users.findIndex(
        //     it => (it.name == tryLoginUser.name))
        // if ((ind >= 0) && (users[ind].password == req.body.password)) {
        // console.log(users, tryLoginUser.name, tryLoginUser.password)
        if (users) {
            res.cookie('user', tryLoginUser.name, {
                signed: true
            })
            res.redirect('/')
        } else {
            res.render('failed.pug')
            // res.end('登陆错误')
        }
    })






// 忘记密码
app.route('/forgot')
    .get((req, res, next) => {
        // console.log(changePassworkTokenMap)
        res.render('forgot.pug')

        // res.end(`<form action='/forgot' method='post'>
        // 请输入你的用户名<input type='text' name='name' />
        // 请输入你的邮箱<input type='text' name='email' />
        // <input type='submit' value='确定'></input>
        // </form>`)
    })
    .post(async (req, res, next) => {
        var name = req.body.name
        var email = req.body.email
        var token = Math.random().toString().slice(2)
        changePassworkTokenMap[token] = email
        setTimeout(() => {
            delete changePassworkTokenMap[token]
        }, 1000 * 60 * 3);
        // console.log(changePassworkTokenMap)
        var link = `http:/localhost:3005/change-password/${token}`
        var user = await db.get('select * from users where name=? and email=?', name, email)
        if (user) {
            var mailopt2 = {
                from: '"投票系统" <965183198@qq.com>', // sender address
                to: email, // list of receivers
                subject: '请点击链接更改密码', // Subject line
                // 发送text或者html格式
                // text: 'Hello world?', // plain text body
                html: `<b>Welcome  用户${name}</b><br>
                <h5>尊敬的用户${name}，请点击链接已更改密码</h5><br>
                <h5><a href=${link} >${link}</a></h5>` // html body
            }
            transporter.sendMail(mailopt2, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                // console.log('Message sent: %s', info.messageId);
                // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
            });
            console.log(link)
            res.end('请查看邮件链接以更改密码')
        } else {
            res.end('邮箱错误或用户不存在')
        }
    })






// 创建投票
app.route('/create')
    .get(async (req, res, next) => {
        if (!req.signedCookies.user) {
            res.redirect('/')
        }
        else{
        var user = await db.get('select * from users where name=?', req.signedCookies.user)
        res.render('createvote.pug', {
            username: req.signedCookies.user,
            id: user.id
        })
    }
    })
    .post(async (req, res, next) => {
        //    console.log(req.body)
        var title = req.body.title
        var desc = req.body.desc
        var createuserid = req.body.createuserid
        var option = req.body.option
        var singlesel = req.body.sle
        var anony = req.body.anony == 'on' ? 1 : 0
        console.log(option)
        var has = await db.get('select * from vote where title=? and desc=?', title, desc)
        if (has) {
            res.send('已存在类似投票，不可重复创建')
        } else {
            await db.run('insert into vote (title,desc,createuserid,singlesel,anony) values (?,?,?,?,?)', title, desc, createuserid, singlesel, anony)
            var vote = await db.get('select * from vote where title=? and desc=?', title, desc)
            var voteid = vote.id
            res.send(`创建成功，投票id为${voteid}
            <a href='/vote/${voteid}'>点击进入投票页面</a>
            `)
            for (element of option) {
                await db.run('insert into option (voteid,optionid,optionname) values (?,?,?)', voteid, option.indexOf(element),element)
            }
        }
    })





// 投票页面
app.route('/vote/:id')
    .get(async(req, res, next) => {
        if (!req.signedCookies.user) {
            res.redirect('/')
        }
        else{
        var voter=req.signedCookies.user
        var id = req.params.id
        console.log(voter)
        var voterinfo=await db.get('select * from users where name=?',voter)
        console.log(voterinfo)
        var voterid=voterinfo.id
        var voterhas=await db.get('select * from voteup where userid=? and voteid=?',voterid,id)
        // console.log(voterid,voterhas)
        if(voterhas){
            res.redirect(`/voted/${id}`)
        }
        else{
            var vote = await db.get('select * from vote where id=?',id)
            var option=await db.all('select * from option where voteid=?',id)
            var createuserid=vote.createuserid
            var user=await db.get('select * from users where id=?',createuserid)
            var username=user.name
            var title=vote.title
            var desc=vote.desc
            var singlesel=vote.singlesel
            var anony=vote.anony
            res.render('vote.pug',{
                id,title,desc,createuserid,option,singlesel,anony,username,voter
            })
        }
    }
    })
    .post(async(req, res, next) => {
        var voteid=req.params.id
        var voter=req.signedCookies.user
        var voterinfo=await db.get('select * from users where name=?',voter)
        var voterid=voterinfo.id
        var voteobj=req.body.ckbox
        for(item of voteobj){
            var optitem = await db.get('select * from option where optionname=?', item)
            var optid=optitem.optionid
            await db.run('insert into voteup (voteid,userid,optionid) values (?,?,?)',voteid,voterid,optid)
        }
        res.redirect(`/voted/${voteid}`)
        // var option=await db.all('select * from option where voteid=?',id)
        // // console.log(title,desc)
        // var temp=[]
        // for (const item of option) {
        //     var optionid=item.optionid
        //     var l=await db.all('select * from voteup where voteid=? and optionid=?',id,optionid)
        //     temp[optionid]=l.length
        // }
    })



// 结果展示页面
app.route('/voted/:id')
    .get(async(req, res, next) => {
        if(!req.signedCookies.user){
            res.redirect('/')
        }else{
            var voter=req.signedCookies.user
            // 投票号
            var id = req.params.id
            var voterinfo=await db.get('select * from users where name=?',voter)
            var voterid=voterinfo.id
            var voterhas=await db.get('select * from voteup where userid=? and voteid=?',voterid,id)
            if(!voterhas){
                res.redirect(`/vote/${id}`)
            }
            else{
                var vote = await db.get('select * from vote where id=?',id)
                var createuserid=vote.createuserid
                var user=await db.get('select * from users where id=?',createuserid)
                var username=user.name
                var option=await db.all('select * from option where voteid=?',id)
                var title=vote.title
                var desc=vote.desc
                var singlesel=vote.singlesel
                var anony=vote.anony
                var voteoptions=await db.all('select * from voteup where voteid=?',id)
                voteoptions=voteoptions.map(a=>a.optionid)
                console.log(voteoptions)
                res.render('voted.pug',{
                    voterid,
                    title,
                    desc,
                    singlesel,
                    anony,
                    username,
                    option,
                    voteoptions
                })
            }
        }
    })
    .post(async(req, res, next) => {
    })





// 注册用户
app.route('/register')
    .get((req, res, next) => {

        res.render('signup.pug')

        //     res.send(
        //         `<form action='/register' method='post'>
        // 用户名<input type='text' id='username' name='name' />
        // 邮箱<input type='text' id='useremail' name='email' />
        // <input type='button' onclick='code()' value='发送邮件验证码'>
        // 邮箱验证码<input type='text' name='emailcode' />
        // 密码<input type='password' name='password' />
        // <input type='submit'></input>
        // </form>
        // <script>
        // function code(){
        //     var uname=document.getElementById('username').value
        //     var uemail=document.getElementById('useremail').value
        //     var xml=new XMLHttpRequest()
        //     xml.open("POST","/emailcode")
        //     xml.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded")
        //     console.log('name='+uname+'&email='+uemail)
        //     xml.send('name='+uname+'&email='+uemail)
        // }
        // </script>
        // `)
    })
    .post(async (req, res, next) => {
        var regInfo = req.body

        var user = await db.get('select * from users where name=?', regInfo.name)
        // if (users.findIndex(it => it.name == regInfo.name) >= 0) {
        if (user) {
            res.render('usered.pug')
            // res.end('已占用')
        } else if (createUserTokenMap[regInfo.name] != regInfo.emailcode) {
            res.render('codefailed.pug')
            // res.end('验证码错误')
        } else {
            await db.run('insert into users (name,email,password) values (?,?,?)', regInfo.name, regInfo.email, regInfo.password)
            res.render('usersuccess.pug')
            // res.send('注册成功')
        }
        // console.log(user)
    })




// 邮箱验证码
app.route('/emailcode')
    .post((req, res, next) => {
        // console.log(req.body)
        var name = req.body.name
        var email = req.body.email
        var codetoken = Math.random().toString().slice(2, 8)
        createUserTokenMap[name] = codetoken
        setTimeout(() => {
            delete createUserTokenMap[name]
        }, 1000 * 60 * 3);

        var mailopt1 = {
            from: '"投票系统" <965183198@qq.com>', // sender address
            to: email, // list of receivers
            subject: '欢迎新用户，请查看验证码', // Subject line
            // 发送text或者html格式
            // text: 'Hello world?', // plain text body
            html: `<b>Welcome  ${name}</b><br>
                   <h5>投票系统验证码：${codetoken}</h5>` // html body
        }
        transporter.sendMail(mailopt1, (error, info) => {
            if (error) {
                return console.log(error);
            }
            // console.log('Message sent: %s', info.messageId);
            // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
        });
        res.end()
        console.log(codetoken)
    })






// 更改密码
app.route('/change-password/:token')
    .get(async (req, res, next) => {
        var token = req.params.token
        // console.log(token,changePassworkTokenMap)
        if (!changePassworkTokenMap[token]) {
            res.render('outofdate.pug')
            // res.end('此链接已失效')
        } else {
            var user = await db.get('select * from users where email=?', changePassworkTokenMap[token])
            var name = user.name
            res.render('changepw.pug', {
                name,
                token
            })
            //     res.end(`重置${user.name}的密码
            // <form action='/change-password/${token}' method='post'>
            // 请输入新密码<input type='text' name='password' />
            // <input type='submit' value='确定'></input>
            // </form>`)
        }
    })
    .post(async (req, res, next) => {
        var token = req.params.token
        var password = req.body.password

        if (!changePassworkTokenMap[token]) {
            res.render('outofdate.pug')
            // res.end('此链接已失效')
        } else {
            var user = await db.get('select * from users where email=?', changePassworkTokenMap[token])
            await db.run('update users set password=? where name=?', password, user.name)
            res.render('cgsucess.pug')
            // res.end('修改成功')
        }
    })




// 登出页面
app.get('/logout', (req, res, next) => {
    res.clearCookie('user')
    res.redirect('/')
})

dbPromise.then(dbObject => {
    db = dbObject
    app.listen(port, () => {
        console.log('server listening at' + port)
    })
})