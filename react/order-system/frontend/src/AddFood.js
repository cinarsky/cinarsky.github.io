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
// console.log(rid)


// const userInfoFetcher=fetcher(async()=>{
//      var a=await api.get('/userinfo').catch(console.log)
//      return a
// })
// var info = userInfoFetcher.read().data
// console.log(info)


function AddFood(props) {
  var rid=props.match.params.rid
    var [foodInfo, setFoodInfo] = useState({
      name: '',
      desc: '',
      price: 0,
      category: '',
      status: 'on',
      img: null,
    })
  
    function change(e) {
      setFoodInfo({
        ...foodInfo,
        [e.target.name]: e.target.value
      })
    }
  
    function imgChange(e) {
      setFoodInfo({
        ...foodInfo,
        img: e.target.files[0],
      })
    }
  
    function submit(e) {
      e.preventDefault()
  
      var fd = new FormData()
      
      for(var key in foodInfo) {
        var val = foodInfo[key]
        fd.append(key, val)
      }
  
      api.post(`/restaurant/${rid}/food`, fd).then(res => {
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
        <h2>添加菜品</h2>
        <form onSubmit={submit}>
          名称：<input type="text" onChange={change} defaultValue={foodInfo.name} name="name"/><br/>
          描述：<input type="text" onChange={change} defaultValue={foodInfo.desc} name="desc"/><br/>
          价格：<input type="text" onChange={change} defaultValue={foodInfo.price} name="price"/><br/>
          分类：<input type="text" onChange={change} defaultValue={foodInfo.category} name="category"/><br/>
          图片：<input type="file" onChange={imgChange} name="img" /><br/>
          <button>提交</button>
        </form>
      </div>
    )
  }
  
  export default AddFood