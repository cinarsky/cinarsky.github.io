import React,{Suspense,useState} from 'react'
import {withRouter} from 'react-router-dom'
import './LandingPage.css'
import createFetcher from './fetcher.js'
import api from './api.js'
import { Button } from 'antd';
//////////////////////////////////////////////
var fetcher=createFetcher((did)=>{
    return api.get('/deskinfo?did='+did)
})
export default withRouter((props) => {
    var [custom,setCustom]=useState(0)
    console.log(props)
    var rid=props.match.params.rid
    var did=props.match.params.did
    function startOrder(){
        if(custom==0){
            return 
        }
       props.history.push(`/r/${rid}/d/${did}/c/${custom}`)
    }
// DeskInfo组件
    function DeskInfo({did}){
         var info=fetcher.read(did).data
        //  console.log(info)
         return (
             <div>
                 <div>餐厅名:{info.title}</div>
                 <div>桌名:{info.name}</div>
             </div>
         )
    }


    return <div className='LandingPage'>
        <Suspense fallback={<div>正在加载桌面信息</div>}> 
           <DeskInfo did={did}></DeskInfo>
        </Suspense>
        <div>选择人数</div>
        <ul className='custom-count'>
            <li className={custom===1?'active':null} onClick={()=>setCustom(1)}>1</li>
            <li className={custom===2?'active':null} onClick={()=>setCustom(2)}>2</li>
            <li className={custom===3?'active':null} onClick={()=>setCustom(3)}>3</li>
            <li className={custom===4?'active':null} onClick={()=>setCustom(4)}>4</li>
        </ul>

        <Button type='ghost' shape='round' size='large' block onClick={startOrder}>开始点餐</Button>
    </div>
})
