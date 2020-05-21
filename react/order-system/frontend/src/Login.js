import React,{useRef} from 'react'
import {withRouter} from 'react-router-dom'
import api from './api'
import history from './history'
import { Input ,Button} from 'antd';

export default withRouter((props) => {
    /////////////利用get userinfo cookie自登录///////////////
        // async function log(){
        //     try{
        //         var a=await api.get('/userinfo')
        //         if(a){
        //             history.push('/manage')
        //         }
        //     }catch(e){
        //         console.log(e)
        //     }
        // }
        // log()
    var nameRef=useRef()
    var passwordRef=useRef()
    async function login(e){
        e.preventDefault();
     var name=nameRef.current.value
     var password=passwordRef.current.value
     try{
         var user =await api.post('/login',{name,password})
         props.history.push(`/restaurant/${user.data.id}/manage/`)
     }catch(e){
         alert(e)
        //  alert('登陆失败')
        }
    }
    return  <div className='Login'>
    <h1>餐厅管理员登陆</h1>
<form>
    <div><span>用户名</span><input ref={nameRef}/></div>
    <div><span>密 码 </span><input type='password' ref={passwordRef}/></div>
    <Button type='ghost' onClick={login}>登录</Button>
</form>
</div>
})
