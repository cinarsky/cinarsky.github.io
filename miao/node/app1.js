const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
app.use(cors({
    origin: true,
    allow: true,
    maxAge: 86400,
    credentials: true,
}))
app.use(express.json())
app.post('/', async (req, res, next) => {
    console.log(req.body.username,req.body.password)
    axios.post('http://senyi.12101.com/admin/?r=login/login',{
      username:req.body.username,
      password:req.body.password,
      code:req.body.password,
      time:req.body.time,
    }).then(data => {
        console.log(data.data)
        res.send(data.data)
    }).catch(data=>{
        console.log(data.data)
    })
})
app.listen(3003, () => {
    console.log('listening at', 3003)
})