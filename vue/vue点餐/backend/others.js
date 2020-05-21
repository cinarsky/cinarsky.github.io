const express = require('express');

const app = express()

app.get('/mi', (req, res) => {
  res.sendFile(__dirname + '/static/assets/mi.html')
})

app.get('/clock', (req, res) => {
  res.sendFile(__dirname + '/static/assets/clock.html')
})

app.get('/ioscheckbox', (req, res) => {
  res.sendFile(__dirname + '/static/assets/ioscheckbox.html')
})

app.get('/slider', (req, res) => {
  res.sendFile(__dirname + '/static/assets/slider.html')
})

app.get('/QR', (req, res) => {
  res.sendFile(__dirname + '/static/assets/QRcode.png')
})

module.exports = app;