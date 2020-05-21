import React, {useState} from 'react'
import api from './api'
import history from './history'
import fetcher from './fetcher'

// let rid
// async function log(){
//     try{var a=await api.get('/userinfo')}
//     catch(e){console.log(e)}
//         rid=a.data.id
//         console.log(rid)
// }
// log()
//效果同上
// var rid
// api.get('/userinfo').then(a=>{rid=a.data.id})
//
function AddDesk(props) {
  var rid=props.match.params.rid
    var [deskInfo, setDeskInfo] = useState({
      name: '',
      capacity: null,
    })
    // console.log(deskInfo)
    function change(e) {
        setDeskInfo({
        ...deskInfo,
        [e.target.name]: e.target.value
      })
    }
  
  
    function submit(e) {
      e.preventDefault()
  
      // var fd = new FormData()
      
      // for(var key in deskInfo) {
      //   var val = deskInfo[key]
      //   fd.append(key, val)
      // }
  
      api.post(`/restaurant/${rid}/desk`,deskInfo).then(res => {
        history.goBack()
      }).catch(
          e=>{
              console.log(e)
              alert('添加失败')
            }
          )
    }
  
    return (
      <div>
        <h2>添加餐桌</h2>
        <form onSubmit={submit}>
          餐桌名称：<input required type="text" onChange={change} defaultValue={deskInfo.name} name="name"/><br/>
          餐桌容量：<input required type="text" onChange={change} defaultValue={deskInfo.capacity} name="capacity"/><br/>
          <button>提交</button>
        </form>
      </div>
    )
  }
  
  export default AddDesk