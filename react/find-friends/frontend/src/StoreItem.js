
import { Router as Router, withRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import React, {
  useState,
  useEffect
} from 'react';
import api from './api'
import host from './host'


function StoreItem(props) {
  var [item, setItem] = useState({})
  var [user,setUser]=useState('')
  
  useEffect(()=>{
    api.get('/aid/'+props.aid).then(data=>{
      console.log(data)
      setItem(data.data)
    }).then(()=>{
      api.post('/writer',{uid:item.uid})
    }).then(data=>{
      setUser(data.data)
    })
    .catch(data=>{
      console.log(data)
    })
  },[])
  console.log(item)
  var target
  if (item.img&&item.img.trim() != '') {
    target =  host+'upload/' + item.img
  } else {
    target =  host+'upload/'+ item.sort + '.png'
  }
  var uimg
  if (user.avatar && user.avatar.trim() != '') {
    uimg =  host+'upload/' + user.avatar
  } else {
    uimg =  host+'upload/avatar.png'
  }
  function detail() {
    props.history.push('/article/detail/'+item.aid)
  }

  return (
    <div className='friendsitem' onClick={detail}>
      
  
      <div>[{item.area}]--{item.title}</div>
      <div>
        <img style={{width:'20px',height:'20px',borderRadius:'100%',marginRight:'20px'}} src={uimg} />
        室友：{user.name} <span style={{width:'20px',display:'inline-block'}}></span> <br/> 创建时间：{new Date(item.date).getFullYear()}年{new Date(item.date).getMonth()+1}月{new Date(item.date).getDate()}日{new Date(item.date).getHours()}时{new Date(item.date).getMinutes()}分
      </div>
      <div >
        <img  src={target} />
        <div>{item.content}</div>
      </div>
    </div>
  )
}


export default withRouter(StoreItem)


