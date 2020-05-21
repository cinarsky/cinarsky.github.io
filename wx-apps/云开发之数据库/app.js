//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      nev:"cinarsky-jxv3d"
    }) 
  },
  globalData: {
    userInfo: null
  }
})