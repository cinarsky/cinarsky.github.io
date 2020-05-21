import React, { Component, useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import api from './api'
import { produce } from 'immer'
import { Button } from 'antd';
import host from './host'
var orderItemStyle = {
    border: '2px solid',
    margin: '5px',
    padding: '5px',
}
// var  rid
// async function log(){
//     try{var a=await api.get('/userinfo')}
//     catch(e){console.log(e)}
//       if(a){
//         rid=a.data.id
//         console.log(rid)
//       }
// }
// log()
var orderItemStyle = {
    border: '2px solid',
    margin: '5px',
    padding: '5px',
  }


function OrderItem(props) {
    // console.log(props)
    var rid=props.rid
    var [orderInfo,setOrder]=useState(props.order)
    function setConfirm(){
        api.put(`/restaurant/${rid}/order/${props.order.id}/status`,{
            status:'confirmed'
        }).then(()=>{
            setOrder({
                ...orderInfo,
                status:'confirmed'
            })
        })
    }
    function setComplete(){
        api.put(`/restaurant/${rid}/order/${props.order.id}/status`,{
            status:'completed'
        }).then(()=>{
            setOrder({
                ...orderInfo,
                status:'completed'
            })
        })
    }
    function deleteOrder(){
        api.delete(`/restaurant/${rid}/order/${props.order.id}`)
        props.onDelete(props.order)
    }
    return <div className='OrderItem'>
     <h3>餐桌名称：{orderInfo.deskName}</h3>
      <h3>总价格：{orderInfo.totalPrice}</h3>
      <h3>人数：{orderInfo.customCount}</h3>
      <h3>订单状态：{orderInfo.status}</h3>
        <div className='FoodItemBtn'>
        <Button type='primary' onClick={setConfirm} disabled={(orderInfo.status === 'confirmed' || orderInfo.status === 'completed')? true : false}>确认</Button>
        <Button type='primary' onClick={setComplete} disabled={orderInfo.status == 'completed' ? true : false}>已结算</Button>
        <Button type='danger' onClick={deleteOrder}>删除</Button> 
        <Button type='dashed' >打印</Button>
        </div>
        <div style={{width:'85vw',borderBottom:'1px solid',margin:'0 auto'}}></div>
    </div>
}

export default class OrderManage extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
          orders: []
        //   [{customCount: 1,
        //     deskName: "888",
        //     details: '',
        //     did: 1,
        //     id: 9998,
        //     rid: 1,
        //     status: "555",
        //     timestamp: "2019-11-07T14:50:58.115Z",
        //     totalPrice: 100}],
        }
        this.onDelete=this.onDelete.bind(this)
      }
      componentDidMount() {
        // componentWillMount() {
          var rid=this.props.match.params.rid
        this.socket=io(`ws://${host}:5000/`)
        this.socket.on('connect',()=>{
            this.socket.emit('join restaurant',rid)
        })
        this.socket.on('new order',order=>{
           
            // this.setState(produce(state => {
            //     state.orders.unshift(order)
            //   }))
        })
             
        var rid=this.props.match.params.rid
        // setTimeout(()=>{
            api.get(`/restaurant/${rid}/order`).then(res => {
                console.log(res)
                this.setState( {
                orders : res.data
                })
              
              })
        // },2000)
      
      }

      componentWillUnmount(){
          this.socket.close()
      }

    //   也可直接将下面的onDelete写成建构函数：onDelete=()=>{}
      onDelete(order){
          var idx=this.state.orders.findIndex(it=>it.id==order.id)
          this.setState(produce(this.state,state=>{
              state.orders.splice(idx,1)
          }))
      }
    render(){
        console.log(2)
        return (
            <div >
                <h2>订单管理</h2>
                <div>
                    {this.state.orders.length >= 0 
                    ?(
                        this.state.orders.length>0?
                        (this.state.orders.map(order => {
                        return <OrderItem rid={this.props.match.params.rid} onDelete=    {this.onDelete} key={order.timestamp}     order={order} />
                        })
                        )
                        :<div>暂无订单</div>
                    )
                    :<div>loading...</div>
                    }
                </div>
            </div>
        )
    }
    
}
