//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl: '',
    videoUrl:''
  },
  //图片存储
  store() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['origin', 'compressed'],
      sourseType: ['album', 'camera'],
      success(res) {
        console.log(res)
        //上传图片
        that.upload(res.tempFilePaths[0])
      }
    })
  },
  upload(fileUrl) {
    var that = this
    wx.cloud.uploadFile({
      cloudPath: '113.png',
      filePath: fileUrl,
      success(res) {
        console.log(res)
        // this.setData({
        //   imgUrl:`res.fileID`
        // })
        that.getPreview(res.fileID)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  getPreview(id) {
    wx.cloud.getTempFileURL({
      fileList: [id],
      success: res => {
        // get temp file URL
        console.log(res.fileList[0].tempFileURL)
        this.setData({
          imgUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  //上传视频
  uploadAV() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      // maxDuration:600,
      camerea: 'back',
      success:(res)=> {
        console.log(res)
        this.uploadVideo(res.tempFilePath)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  uploadVideo(val){
    console.log(val);
    
    wx.cloud.uploadFile({
      cloudPath:'hgdfifdso.mp4',
      filePath:val,
      success:(res)=> {
        console.log(res)
        //预览
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: sss => {
            // get temp file URL
            console.log(sss.fileList[0].tempFileURL)
            this.setData({
              videoUrl: sss.fileList[0].tempFileURL
            })
          },
          fail: err => {
            console.log(err)
          }
        })  
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})
