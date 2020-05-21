import React, { useState,useEffect } from 'react';
import {Router as Router, Route,Switch,Link} from 'react-router-dom';
import api from './api';
import StoreItem from './StoreItem'


function Minestore(props) {
  var [zan,setZan]=useState([])
  useEffect(()=>{
     api.get('/zan').then(data=>{
        console.log(data.data)
        setZan(data.data)
    }).catch(data=>{
      console.log(data)
    })
  },[])
  function back(){
    props.history.push('/content/')
  }
  return (
  <div className='minearticle'>
     <button className='back' onClick={back}>返回</button>
   {zan.length==0 ? '收藏列表为空':
     zan.map((it,idx)=>{
       return (
          <StoreItem aid={it.aid}  key={it.aid}></StoreItem>
           )
     }
     )
   }
  </div>
  );
}

export default Minestore;
   // <div key={it.title}>
        //   <h2>{it.title}</h2>
        //   <h4>{it.content}</h4>
        //   <img src={`http://localhost:5002/upload/${it.img}`} ></img>
        // </div>