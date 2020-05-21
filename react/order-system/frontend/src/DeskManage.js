import React,{useState,useEffect} from 'react'
import api from './api'
import { Link } from 'react-router-dom'
import { Button } from 'antd';

  var deskInfoStyle = {
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

  function DeskItem({desk, onDelete,rid}) {
    var [deskInfo, setDeskInfo] = useState(desk)
    var [isModify, setIsModify] = useState(false)
    var [deskProps, setDeskProps] = useState({
      name: desk.name,
      capacity: desk.capacity,
    })
  
  
    function save() {
      // var fd = new FormData()
  
      // for(var key in deskProps) {
      //   var val = deskProps[key]
      //   fd.append(key, val)
      // }
  
      api.put(`/restaurant/${rid}/desk/` + desk.id, deskProps).then((deskInfo) => {
        setDeskInfo(deskInfo.data)
        setIsModify(false)
      })
    }
  
    function change(e) {
      setDeskProps({
        ...deskProps,
        [e.target.name]: e.target.value
      })
    }
  
  
    function deleteDesk() {
      api.delete(`/restaurant/${rid}/desk/` + desk.id).then(() => {
        onDelete(desk.id)
      })
    }
  // function imgChange(e) {
    //   setFoodProps({
    //     ...foodProps,
    //     img: e.target.files[0],
    //   })
    // }

    // function setOnline() {
    //   api.put('/restaurant/1/food/' + food.id, {
    //     ...foodProps,
    //     status: 'on',
    //   }).then(res => {
    //     setdeskInfo(res.data)
    //   })
    // }
    // function setOffline() {
    //   api.put('/restaurant/1/food/' + food.id, {
    //     ...foodProps,
    //     status: 'off',
    //   }).then(res => {
    //     setdeskInfo(res.data)
    //   })
    // }

    function getContent() {
      if (isModify) {
        return (
          <div >
            <form>
              餐桌名称：<input className='FoodManageInput' type="text" onChange={change} defaultValue={deskInfo.name} name="name"/><br/>
              餐桌容量：<input className='FoodManageInput' type="text" onChange={change} defaultValue={deskInfo.capacity} name="capacity"/><br/>
            </form>
          </div>
        )
      } else {
        return (
          <div >
            <h3>餐桌名称：{deskInfo.name}</h3>
            <h3>餐桌容量：{deskInfo.capacity}</h3>
          </div>
        )
      }
    }
  
  
    return (
      <div className='OrderItem'>
     
        {getContent()}
        <div className='FoodItemBtn'>
          <Button type='primary' onClick={() => setIsModify(true)}>修改</Button>
          <Button onClick={save}>保存</Button>
          <Button type='danger' onClick={deleteDesk}>删除</Button>
        </div>
        <div style={{width:'85vw',borderBottom:'1px solid',margin:'0 auto'}}></div>
      </div>
    )
  }



export default function DeskManage(props) {
  var rid=props.match.params.rid
    var [desks,setDesks]=useState([])
    useEffect(()=>{
        api.get(`/restaurant/${rid}/desk`).then(res=>{
          // console.log(res)
          setDesks(res.data)
        })
    },[])

    function onDelete(id) {
        setDesks(desks.filter(it => it.id !== id))
      }
    return (
        <div>
        <Button type='primary' className='FoodManageAddFood'><Link to={`/restaurant/${rid}/manage/add-desk`}>添加餐桌</Link></Button>
        <div>
          { 
            desks.map(desk => {
              // console.log(food)
              return <DeskItem rid={rid} onDelete={onDelete} key={desk.id} desk={desk}/>
            })
          }
        </div>
      </div>
      )

}
