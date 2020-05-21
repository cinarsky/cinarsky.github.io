import React,{useState,useEffect} from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import host from './host'
var imgStyle = {
    float: 'left',
    border: '1px solid',
    width: '120px',
    height: '100px',
    // objectFit: 'contain',
    align:"middle"
  }
  var foodInfoStyle = {
    overflow: 'hidden',
  }
  var cardStyle = {
    border: '2px solid',
    padding: '5px',
    margin: '5px',
  }

// var  rid
// async function log(){
//     try{var a=await api.get('/userinfo')}
//     catch(e){console.log(e)}
//       if(a){
//         rid=a.data.id
//         console.log(rid)
//       }
// }
// log()

  function FoodItem({food, onDelete,rid}) {
    var [foodInfo, setFoodInfo] = useState(food)
    var [isModify, setIsModify] = useState(false)
    var [foodProps, setFoodProps] = useState({
      name: food.name,
      desc: food.desc,
      price: food.price,
      category: food.category,
      status: food.status,
      img: null,
    })
  
  
    function save() {
      var fd = new FormData()
  
      for(var key in foodProps) {
        var val = foodProps[key]
        fd.append(key, val)
      }
  
      api.put(`/restaurant/${rid}/food/` + food.id, fd).then((foodInfo) => {
        setFoodInfo(foodInfo.data)
        setIsModify(false)
      })
    }
  
    function change(e) {
      setFoodProps({
        ...foodProps,
        [e.target.name]: e.target.value
      })
    }
  
    function imgChange(e) {
      setFoodProps({
        ...foodProps,
        img: e.target.files[0],
      })
    }
  
    function deleteFood() {
      api.delete(`/restaurant/${rid}/food/` + food.id).then(() => {
        onDelete(food.id)
      })
    }
  
    function setOnline() {
      api.put(`/restaurant/${rid}/food/` + food.id, {
        ...foodProps,
        status: 'on',
      }).then(res => {
        setFoodInfo(res.data)
      })
    }
    function setOffline() {
      api.put(`/restaurant/${rid}/food/` + food.id, {
        ...foodProps,
        status: 'off',
      }).then(res => {
        setFoodInfo(res.data)
      })
    }
  
    function getContent() {
      if (isModify) {
        return (
          <div style={{
            width: '95vw',
            margin:'0 auto',
             background: 'rgba(219, 219, 219, 0.5)',
            borderRadius: '5px',
          }}>
            <form>
              名称：<input className='FoodManageInput' type="text" onChange={change} defaultValue={foodInfo.name} name="name"/><br/>
              描述：<input className='FoodManageInput' type="text" onChange={change} defaultValue={foodInfo.desc} name="desc"/><br/>
              价格：<input className='FoodManageInput' type="text" onChange={change} defaultValue={foodInfo.price} name="price"/><br/>
              分类：<input  className='FoodManageInput' type="text" onChange={change} defaultValue={foodInfo.category} name="category"/><br/>
              图片：<input className='FoodManageInput' type="file" onChange={imgChange} name="img" />
            </form>
          </div>
        )
      } else {
        return (
          <div className='menuItemStyle'>
                      <img src={`http://${host}:5000/upload/` + foodInfo.img} alt={foodInfo.name} className='imgStyle'/>
            <div style={{fontSize:'18px',}}>
            <div style={{paddingRight:'25px',}}>菜品：{foodInfo.name}</div>        
            <div style={{paddingRight:'25px',}}>描述：{foodInfo.desc}</div>
            <div style={{paddingRight:'25px',}}>价格：{foodInfo.price}</div>
            <div style={{paddingRight:'25px',}}>分类：{foodInfo.category ? foodInfo.category : '[暂未分类]'}</div>
            </div> 
          </div>
        )
      }
    }
  
  
    return (
      <div >
        {getContent()}
        <div className='FoodItemBtn'>
          <Button type='primary' onClick={() => setIsModify(true)}>修改</Button>
  
          <Button onClick={save}>保存</Button>
  
          {foodInfo.status === 'on' &&
            <Button type='dashed' onClick={setOffline}>下架</Button>
          }
          {foodInfo.status === 'off' &&
            <Button onClick={setOnline}>上架</Button>
          }
          <Button type='danger' onClick={deleteFood}>删除</Button>
        </div>
        <div style={{width:'85vw',borderBottom:'1px solid',margin:'0 auto'}}></div>
      </div>
    )
  }



export default function FoodManage(props) {
  var rid=props.match.params.rid
    var [foods,setFoods]=useState([])
    useEffect(()=>{
        api.get(`/restaurant/${rid}/food`).then(res=>{
          // console.log(res)
            setFoods(res.data)
        })
    },[])

    function onDelete(id) {
        setFoods(foods.filter(it => it.id !== id))
      }
    return (
        <div className=''>
        <Button type='primary' className='FoodManageAddFood'><Link to={`/restaurant/${rid}/manage/add-food`}>添加菜品</Link></Button>
        <div>
          { 
            foods.map(food => {
              // console.log(food)
              return <FoodItem rid={rid} onDelete={onDelete} key={food.id} food={food}/>
            })
          }
        </div>
      </div>
      )

}
