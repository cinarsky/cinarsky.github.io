const db=wx.cloud.database().collection("list")
Page({
  addData(e){
    db.add({
      data:{
        name:"hpk",
        age:25
      },
      success(res){
        console.log('success',res)
      },
      fail(res){
        console.log('fail',res)
      }
    })
  },
  searchData(){
    db.get({
      success(res){
        console.log('查询success',res)
      } 
    })
  },
  delData(){
    

  }
})
