import React,{useEffect,useState} from 'react'
import axios from 'axios'
import io from 'socket.io-client'


function Login() {
  var [name,setName]=useState('')
  var [password,setPassword]=useState('')
  var [code,setCode]=useState('')
  var [time,setTime]=useState('')
  var [xxx,setXxx]=useState('')
function cb(val){
 console.log(1)
  console.log(val)
  // setCode(val.data.code)
  // setTime(val.data.time)

}
  useEffect(()=>{


   
  },[])
  function nameChange(e){
    setName(e.target.value)
  }
  function pasChange(e){
    setName(e.target.value)
  }
  function  codeChange(e){
    setCode(e.target.value)
  }
  function login(){

  }
  return (
    <div >
<div>
  用户名<input onInput={nameChange} value={name}/>
</div>
<div>
  密码<input onInput={pasChange} value={password}/>
</div>
<div id='result'></div>
<div>
  验证码<input onInput={codeChange} value={code}/>
</div>
<button onClick={login}>login</button>
</div>
  );
}

export default Login;
