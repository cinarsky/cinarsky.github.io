var nodemailer = require('nodemailer');
//配置邮件
var transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection: true,
    port:465,
    auth: {
        user: '965183198@qq.com',
        pass: 'yghecvjmfkyjbfed',
    }
});
module.exports=transporter
