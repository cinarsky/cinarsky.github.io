
import {Router as Router,withRouter} from 'react-router-dom';
import React, {
  useState,
  useEffect
} from 'react';


function HousesItem(props){
  var [item,setItem]=useState(props.contentItem)
  // useEffect(()=>{

  // },[])
  function detail(){
    props.history.push('/article/houses/:aid')
  }
  return (
    <div onClick={detail}>
      {item.id}
    </div>
  )
}

 
export default withRouter(HousesItem)


