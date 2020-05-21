//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:"cinarsky-jxv3d"
    })
  },
  globalData: {
    userInfo: null
  }
})