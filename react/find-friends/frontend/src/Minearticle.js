import React, { useState,useEffect } from 'react';
import {Router as Router, Route,Switch,Link} from 'react-router-dom';
import api from './api';
import FriendsItem from './FriendsItem'

function Minearticle(props) {
  var [articles,setArticles]=useState([])
  useEffect(()=>{
    api.get('/article/user').then(data=>{
        console.log(data)
        setArticles(data.data)
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
   {articles.length==0? '暂未发布帖子':
     articles.map((it,idx)=> (
      <FriendsItem sort={it.sort} contentItem={it} key={it.aid}></FriendsItem>
       )
     )
   }
  </div>
  );
}

export default Minearticle;
   // <div key={it.title}>
        //   <h2>{it.title}</h2>
        //   <h4>{it.content}</h4>
        //   <img src={`http://localhost:5002/upload/${it.img}`} ></img>
        // </div>