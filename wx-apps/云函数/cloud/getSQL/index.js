// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cinarsky-jxv3d"
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取数据库数据
  return  cloud.database().collection("list").get()
}