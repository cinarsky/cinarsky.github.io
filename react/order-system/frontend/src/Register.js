import React,{useRef} from 'react'
import {withRouter} from 'react-router-dom'
import api from './api'
import { Button } from 'antd';
export default withRouter((props) => {
    var nameRef=useRef()
    var passwordRef=useRef()
    var titleRef=useRef()
    async function createUser(e){
        e.preventDefault();
     var name=nameRef.current.value
     var password=passwordRef.current.value
     var title=titleRef.current.value
     try{
         var user =await api.post('/register',{name,password,title})
         props.history.push('/login')
     }catch(e){
         console.log(e)
         alert('注册失败')
        }
    }
    var styleobj={
        display:'block',
        margin:'0 auto',
        paddingTop:'50px'
    }
    return(
    <div className='Login'>
       <h2 style={styleobj}>商家用户注册</h2>
       <form className=''>
       <div>用户名<input  ref={nameRef}/></div>
       <div>密 码 <input  type='password' ref={passwordRef}/></div>
       <div>商家名<input  type='title' ref={titleRef}/></div>
       <Button type='ghost' onClick={createUser}>登录</Button>
       </form>
    </div>)
})
