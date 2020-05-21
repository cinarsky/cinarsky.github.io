


const express = require('express')
const port = 3006
const app = express()

var pendingResponses = []

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/msg', (req, res, next) => {
  pendingResponses.push(res)
})

app.post('/msg', (req, res, next) => {
  console.log(req.body)
  pendingResponses.forEach(response => {
    response.end(req.body.msg)
  })
  pendingResponses.length = 0
  res.end()
})

app.listen(port, () => {
  console.log('listening on port', port)
})


