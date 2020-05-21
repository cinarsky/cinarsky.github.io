import React, {
  useState,
  useEffect
} from 'react';
import {Redirect, Route,Switch} from 'react-router-dom';
import {
  Button,
  Input
} from 'antd';
import api from './api'
// 登陆组件
function Submit(props){
  var [name,setName]=useState('')
  var [password,setPassword]=useState('')
  useEffect(()=>{
    api.get('/login').then(data=>{
      if(data.data.code==-1){
        console.log(data.data.msg)
      }else{
        props.history.push('/content/')
      }
    }).catch(data=>{
      console.log(data)
    })
  },[])
 function nameChange(e) {
  setName(e.target.value)
  }
  function psChange(e) {
    setPassword(e.target.value)
  }
  function login(e) {
    api.post('/login',{
      name,password
    }).then(data=>{
      console.log(data)
      if(data.data.code==-1){
        alert(data.data.msg)
      }else{
        props.history.push('/content/')
      }
    }).catch(data=>{
      console.log(data)
    })
    // props.history.push('/content/')
  }
  function forgot(e) {
    props.history.push('/login/forgot' )
  }
  function create(e) {
  
    props.history.push('/login/create' )
  }

  return (
  <div className='submit'>
    <div>
  <h3>用户名</h3> < Input onInput={nameChange} value={name}/><br/>
  <h3>密码</h3> < Input.Password onInput={psChange} value={password}/><br/></div>
  <div className='btnGroup'>
  <Button className='btn1' onClick={login}> 登录 </Button><br/>
  <Button type="link" onClick={forgot}> 忘记密码 </Button><br/>
  <Button className='btn2' type="link" onClick={create}> 新用户注册 </Button>
  </div>
  
 </div> )
}


//忘记密码组件
function Forgot(props){
  var [name,setName]=useState('')
  var [email,setEmail]=useState('')
  var [code,setCode]=useState('')
  var [btn,setBtn]=useState('获取验证码')
  var [show,setShow]=useState(false)
  var [password,setPassword]=useState('')
  function nameChange(e) {
    setName(e.target.value)
    }
    function emailChange(e) {
      setEmail(e.target.value)
    }
    function codeChange(e) {
      setCode(e.target.value)
    }
    function getCode(){
      if(name.trim()==''||email.trim()==''){return }
      setShow(true)
      api.post('/getcode',{
        name,email
      }).then(data=>{
        console.log(data)
        setBtn(data.data)
      }).catch((data)=>{
      })
      
    }
    function submit(){
      if(name.trim()==''||email.trim()==''||code.trim()==''||password.trim()==''){
        return 
      }
      api.put('/changep',{
        name,password,code
      }).then(data=>{
        console.log(data)
        props.history.push('/login/subit' )
      }).catch((data)=>{
         
      })
    }
   return (
   <div className='forgot'>
    <h3>用户名</h3> < Input onInput={(e)=>{nameChange(e)}} value={name} />
    <h3>Email</h3> < Input onInput={(e)=>{emailChange(e)}} value={email}/>
    <div className='btnGroup'>
   <Button onClick={getCode} disabled={show}> {btn} </Button><br/>
   <h3>验证码</h3>< Input  onInput={(e)=>{codeChange(e)}} value={code}/>
   <h3>新密码</h3>< Input onInput={(e)=>{setPassword(e.target.value)}} value={password}/>
   <Button onClick={submit} className='btn1'> 确定更改 </Button><br/>
   </div>
 </div> )
 }

//创建新用户组件
 function Create(props){
  var [name,setName]=useState('')
  var [password,setPassword]=useState('')
  var [email,setEmail]=useState('')
  function nameChange(e) {
    setName(e.target.value)
    }
    function psChange(e) {
      setPassword(e.target.value)
    }
    function emChange(e) {
      setEmail(e.target.value)
    }
    function create(e) {
      
      api.post('/create',{
        name,password,email
      }).then(data=>{
        setName('')
        setPassword('')
        setEmail('')
        if(data.data.code==-1){
          alert(data.data.msg)
        }else{
          alert('创建成功，欢迎'+ data.data.name+',点击进入登陆')
          props.history.push('/login/submit' )
        }
      }).catch((data)=>{
         alert('创建失败，请重试')
      })
    }
   return (
   <div className='create'>
   <h3>用户名</h3> < Input onInput={(e)=>{nameChange(e)}} value={name} />
   <h3>密码</h3> < Input.Password onInput={(e)=>{psChange(e)}} value={password}/>
   <h3>邮箱</h3> < Input onInput={(e)=>{emChange(e)}} value={email}/>
   <Button className='btn1' onClick={create}> 创建 </Button>
 </div> )
 }
 

class Login extends React.Component {
  constructor(props) {
    super(props);
   
  }

  
  render() {
    return (
      <div className='login'>
        <div className='logo'>拼室友</div>
    <Redirect push to="/login/submit" />
    <Switch>
      <Route path='/login/submit'  component={Submit}/> 
      <Route path='/login/forgot'  component={Forgot}/> 
      <Route path='/login/create'  component={Create}/> 
    </Switch>
       </div>
    )
  }
}
export default Login;