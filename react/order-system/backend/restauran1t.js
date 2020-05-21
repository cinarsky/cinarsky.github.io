
const express=require('express')
let db
(async function(){
    db=await require('./db')
})()
const app=express.Router()


// 获得桌面信息
app.get('/deskinfo',async(req,res,next)=>{
    var desk = await db.get(`select 
    desks.id as did,
    users.id as uid,
    desks.name,
    users.title
    from desks join users on desks.rid = users.id
    where desks.id=?
    `, req.query.did)
    res.json(desk)

})
// 获得餐厅信息
app.get('/menu/restaurant/:rid',async(req,res,next)=>{
    var menu=await db.all(`select * from foods where rid=?`,req.params.rid)
    req.json(menu)
})
// 用户下单
app.post('/order',async(req,res,next)=>{

  
})

///////////////////菜品管理//////////////////////////
app.route('/restaurant/:rid/food')
// 展示菜品
  .get(async(req,res,next)=>{
    var foodList=await db.all(`select * from foods where rid=?`,req.params.rid)
    res.json(foodList)
  })
//   增加菜品
  .post(async(req,res,next)=>{
    await db.run(`
    insert into foods (rid,name,price,status) values(?,?,?,?)`,req.cookies.userid,req.body.name,req.body.price,req.body.status)
    var food=await db.get(`selsct * from foods order by id desc limit 1`)
    res.json(food)
})
app.route('/restaurant/:rid/food/:fid')
//   删除菜品
  .delete(async(req,res,next)=>{
 
  })
//   修改菜品
  .put(async(req,res,next)=>{

})
///////////////////桌面管理//////////////////////////
app.route('/restaurant/:rid/desk')
// 展示桌面
  .get(async(req,res,next)=>{
      
  })
//   增加桌面
  .post(async(req,res,next)=>{

})

app.route('/restaurant/:rid/food/:fid')
//   删除桌面
  .delete(async(req,res,next)=>{
 
  })
//   修改桌面
  .put(async(req,res,next)=>{

})
module.exports=app