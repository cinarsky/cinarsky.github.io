import React, { useState, useEffect } from 'react';
// import { Router as Router, Route, Switch, Link } from 'react-router-dom';
import api from './api';
// import axios from 'axios'
import host from './host'

function Article(props) {
  var [aid, setAid] = useState(props.match.params.aid)
  console.log(props);
  
  var [article, setArticle] = useState({})
  var [user, setUser] = useState({})
  var [show, setShow] = useState('none')
  var [comment,setComment]=useState('')
  var [comments,setComments]=useState([])
  var [zan,setZan]=useState([])
  var [uid,setUid]=useState(NaN)

  useEffect(() => {
    api.post('/article/aid', {
      aid
    }).then(data => {
      setArticle(data.data[0])
      setUser(data.data[1])
      setComments(data.data[2].reverse())
      setZan(data.data[3])
      setUid(data.data[4])
    })
  }, [])
  console.log(zan.find(it=>it.uid==uid&&it.sort==1),zan.find(it=>it.uid==uid&&it.sort==2))
  // console.log(props.match.params.aid)
  var target
  if (article.img && article.img.trim() != '') {
    target = host+'upload/' + article.img
  } else {
    target = host+'upload/' + article.sort + '.png'
  }
  var uimg
  if (user.avatar && user.avatar.trim() != '') {
    uimg = host+'upload/' + user.avatar
  } else {
    uimg = host+'upload/avatar.png'
  }
function showdetail(e){
  console.log(e.target)
  console.log(show)
  if(show=='none'){
    setShow('block')
  }else{
    setShow('none')
  }
}
function subComment(){
  if(comment.trim()==''){return }
  api.post('/comments',{
    aid,
    comment
  }).then(data=>{
    console.log(data.data)
    setComments(data.data.reverse())
    setComment('')
  })
}
function z(sort){
  api.post('/zan',{
    sort,
    aid
  }).then(data=>{
    setZan(data.data[1])
  })
}  
function back(){
  props.history.push('/content/')
}
  return (
    <div className='articles'>
  <button className='back' onClick={back}>返回</button>
      <div className='top'>

        <h2> [{article.area}]--{article.title}</h2>
        <img src={uimg}></img>
        室友：{user.name} <br />
        创建时间：{new Date(article.date).getFullYear()}年{new Date(article.date).getMonth() + 1}月{new Date(article.date).getDate()}日{new Date(article.date).getHours()}时{new Date(article.date).getMinutes()}分
        <br /> <br />
        <hr></hr>
        <div className='acontent'>{article.content}<br />
          <img src={target}></img>
        </div>

      </div>

      <div className='footer'>
        {/* 评论展示 */}
        <div className='pos' style={{top:show=='block'?'-75vh':'100%'}}>
          <div>
            {comments.map((it,idx)=>{
              return (
                <Comment key={it.cid} item={it}></Comment>
              )
            })}
          </div>
          <div><input value={comment} onInput={(e)=>{setComment(e.target.value)}}/><button onClick={subComment}>提交</button></div>
        </div>
        <div className={ zan.find(it=>it.uid==uid&&it.sort==1)?'active':'' } onClick={()=>{z(1)}}>赞赏({zan.filter(it=>it.sort==1).length})</div>
        <div onClick={showdetail}>评论({comments.length})
        </div>
        <div className={ zan.find(it=>it.uid==uid&&it.sort==2)?'active':'' } onClick={()=>{z(2)}}>收藏({zan.filter(it=>it.sort==2).length})</div>
      </div>
    </div>
  );
}
function Comment(props){
  var [comment,setComment]=useState(props.item)
  var [user,setUser]=useState({})
  useEffect(()=>{
    api.post('/writer',{uid:comment.uid}).then(data=>{
      setUser(data.data)
    }).catch(data=>{
      console.log(data)
    })

  },[])
  var uimg
  if (user.avatar && user.avatar.trim() != '') {
    uimg =  host+'upload/' + user.avatar
  } else {
    uimg =  host+'upload/avatar.png'
  }
  return (
    <div className='comment'>
      <span style={{paddingRight:'20px'}}>
      <img style={{width:'30px',height:'30px',borderRadius:'100%'}} src={uimg} />
      {user.name} :
      </span>
      {comment.content}<br/>
      <div style={{fontSize:'14px',paddingLeft:'10px'}}>{new Date(comment.date).getFullYear()}年{new Date(comment.date).getMonth()+1}月{new Date(comment.date).getDate()}日{new Date(comment.date).getHours()}时{new Date(comment.date).getMinutes()}分 </div>
    </div>
  )
}
export default Article;
