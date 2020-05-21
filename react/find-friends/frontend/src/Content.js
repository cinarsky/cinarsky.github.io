
import {Router as Router,Redirect, Route,Switch,Link,NavLink} from 'react-router-dom';
import React, {
  useState,
  useEffect
} from 'react';
import HousesItem from './HousesItem'
import FriendsItem from './FriendsItem'
import api from './api'
import {
  Button,

} from 'antd';
import host from './host'
function Friends(props){
  var [articles,setArticles]=useState([])
  useEffect(()=>{
    api.get('/article/1').then(data=>{
      setArticles(data.data.reverse())
    }).catch(data=>{
      console.log(data)
    })
  },[])
  return (
   <div className='friends'>
     <h2>找室友 </h2>
      {articles.map((it,idx)=>{
       return  <FriendsItem sort={it.sort} contentItem={it} key={it.aid}></FriendsItem>
      })}
      </div>
  )
}
function Houses(props){
  var [articles,setArticles]=useState([])
  useEffect(()=>{
    api.get('/article/2').then(data=>{
      setArticles(data.data.reverse())
    }).catch(data=>{
      console.log(data)
    })
  },[])
  return (
   <div className='houses'>
     <h2>找房子</h2> 
      {articles.map((it,idx)=>{
       return  <FriendsItem  sort={it.sort}  contentItem={it} key={it.aid}></FriendsItem>
      })}
      </div>
  )
}
function Mine(props){
  var [user,setUser]=useState({})
  var target
  if(user.avatar && user.avatar!=''){
    target=  host+'upload/'+user.avatar
 }else{
   target=  host+'upload/avatar.png'
 }
  useEffect(()=>{
    api.get('/login').then(data=>{
      if(data.data.code==-1){
        console.log(data.data.msg)
      }else{
        setUser(data.data)
      }
    }).catch(data=>{
      console.log(data)
    })
  },[])
  function logout(){
    api.get('/logout').then(data=>{
      if(data.data.code==0){
        console.log(data.data.msg)
        props.history.push('/login/')
      }
    }).catch(data=>{
      console.log(data)
    })
   
  }
  function changeAva(e){
    console.log(e.target.files[0])
    var fd = new FormData();
    fd.append("img", e.target.files[0]);
    api.put('/login',fd).then(data=>{
      if(data.data.code==0){
        console.log(data.data)
        setUser({
          ...user,
          avatar:data.data.avatar
        })

      }else{
        console.log(data.data)
      }
    }).catch(data=>{
      console.log(data)
    })
  }
  function mine(){
    props.history.push('/article/mine/')
  }
  function mineStore(){
    props.history.push('/article/minestore/')
  }
  return (
    <div className='mine'>
      <div className='avatar'>
       <img  src={target} />
      <h2>{user.name}</h2>
      <h4>等级：高级室友</h4>
      </div>
    <div className='item'>
    <div className='lb'><label>
      <div className='changeimg'>修改头像</div>
      <input  accept="image/x-png,image/gif,image/jpeg,image/bmp"  type="file" id='change' onChange={changeAva} name="img" style={{}}/>
      </label></div>
       <div>
       <Button type="primary" onClick={mine}>我的帖子</Button>
       </div>
       <div>
       <Button type="primary" onClick={mineStore}>我的收藏</Button>
       </div>
       <div>
    <Button type="danger" onClick={logout}>退出登录</Button></div>
    </div>

    </div>
  )
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tab:1,
      name:'loading...'
    }
  }
  componentDidMount(){
    api.get('/login').then(data=>{
      if(data.data.code==-1){
        console.log(data.data.msg)
      }else{
        this.setState({
          name:data.data.name
        })
      }
    }).catch(data=>{
      console.log(data)
    })
  }
  setTab1=()=>{
    this.setState({
      tab:1
    })
  }
  setTab2=()=>{
    this.setState({
      tab:2
    })
  }
  setTab3=()=>{
    this.setState({
      tab:3
    })
  }
  setTab4=()=>{
    this.setState({
      tab:4
    })
  }
  render() { 
    return ( 
      <div className='content'>
   <Redirect push to="/content/friends" />
   <div className='top'>拼室友</div>
    <div className='main'>
    <Switch>
      <Route path='/content/friends'  component={Friends}/> 
      <Route path='/content/houses'  component={Houses}/> 
      <Route path='/content/mine'  component={Mine}/> 
    </Switch>
     </div> 
      <div className='footer'>
        <Link className={this.state.tab==1?'active':''} onClick={this.setTab1} to='/content/friends' >找室友</Link><br/>
        <Link className={this.state.tab==2?'active':''} onClick={this.setTab2} to='/content/houses' >找房子</Link><br/>
        <Link className={this.state.tab==3?'active':''} onClick={this.setTab3} to='/newarticle' >发布帖子</Link><br/>
        <NavLink className={this.state.tab==4?'active':''} onClick={this.setTab4} to='/content/mine' >我的</NavLink>
      </div>
      </div>
     );
  }
}
// className={this.state.tab==4?'active':''}
export default Content;


