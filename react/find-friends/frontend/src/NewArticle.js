import React, {
  useState,
  useEffect,
} from 'react';
import { Router as Router, Route, Switch, Link } from 'react-router-dom';
import api from './api'
import { Cascader, Radio, Input,Button } from 'antd';

const { TextArea } = Input;

function NewArticle(props) {
  var [uid,setUid]=useState()
  var [city, setCity] = useState('北京')
  var [aim, setAim] = useState('1')
  var [title, setTitle] = useState('')
  var [content, setContent] = useState('')
  var [img,setImg]=useState('')
  console.log(img)
  useEffect(()=>{
    api.get('/login').then(data=>{
      if(data.data.code==-1){
        console.log(data.data.msg)
      }else{
        setUid(data.data.id)
      }
    }).catch(data=>{
      console.log(data)
    })
  },[])
  function imgChange(e) {
    setImg(e.target.files[0])
  }
  function newArticle(){
    if(aim.trim()==''||content.trim()==''){
      return 
    }
    var fd = new FormData();
        fd.append("uid", uid);
        fd.append("city", city);
        fd.append("aim", aim);
        fd.append("title", title);
        fd.append("content", content);
        fd.append("img", img);
      api.post('/newarticle',fd).then(data=>{
        if(data.data.code==0){
          props.history.push('/content/')
          console.log(data.data)
        }else{
          console.log(data.data)
        }
      }).catch(data=>{
        console.log(data)
      })
  }
  function back(){
    console.log(props.history)
    props.history.goBack()
    // props.history.push('/content/')
  }
  return (
    <div className='newarticle'>
    <button className='back' onClick={back}>返回</button><br/>
        <div className='logo'>拼室友</div>
      <div>
      <Radio.Group defaultValue="1" onChange={(e) => { setAim(e.target.value) }}>
        <Radio.Button value="1" name='aim'>找室友</Radio.Button>
        <Radio.Button value="2" name='aim'>找房子</Radio.Button>
      </Radio.Group>
      <br></br>
      <select name='city' onChange={(e) => {
        setCity(e.target.value)
      }} >
        <option value='北京'>北京</option>
        <option value='上海'>上海</option>
        <option value='广州'>广州</option>
        <option value='深圳'>深圳</option>
        <option value='成都'>成都</option>
        <option value='重庆'>重庆</option>
        <option value='杭州'>杭州</option>
        <option value='南京'>南京</option>
        <option value='武汉'>武汉</option>
        <option value='西安'>西安</option>
        <option value='郑州'>郑州</option>
      </select>

      <div>标题</div>
      <TextArea name='title' placeholder="请输入帖子标题" value={title}
        onChange={(e)=>{setTitle(e.target.value
          )}}autoSize /><br></br><br></br>
      <div>内容</div>
      <TextArea name='content'
        value={content}
        onChange={(e)=>{setContent(e.target.value
          )}}
        placeholder="请输入帖子内容"
        autoSize={{ minRows: 3, maxRows: 5 }}
      /><br></br><br></br>
      上传图片（可选）
     <input accept="image/x-png,image/gif,image/jpeg,image/bmp"  type="file" onChange={imgChange} name="img" />
      <br></br><br></br>
      <Button className='btn' type='primary' onClick={newArticle}>发布</Button>
    </div>
    </div>
  );
}

export default NewArticle;
