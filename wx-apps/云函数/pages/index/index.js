//index.js
//获取应用实例
const app = getApp()

Page({
  addddd() {
    wx.cloud.callFunction({
      name: 'add',
      data: {
        a: 2,
        b: 5,
      },
      success(res) {
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getsql(){
    wx.cloud.callFunction({
      name:"getSQL",
      success(res) {
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})