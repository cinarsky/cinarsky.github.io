var nodemailer  = require("nodemailer")

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: 'qq',
    auth: {
        user: '810006338@qq.com', // 账号
        pass: 'ropvqnzdfdwubegd' // 密码
    }
})

module.exports = smtpTransport