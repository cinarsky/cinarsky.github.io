import React, { Suspense, useState,useEffect,Component } from 'react'
import { withRouter } from 'react-router-dom'
import createFetcher from './fetcher.js'
import api from './api.js'
import {produce} from 'immer'
import history from './history'
import io from "socket.io-client";
import { Button } from 'antd';
import host from './host'
// var fetcher=createFetcher((did)=>{
//     return api.get('/deskinfo?did='+did)
// })
// function DeskInfo({did}){
//     var info=fetcher.read(did).data
//    //  console.log(info)
//     return (
//         <div>
//             <div>餐厅名:{info.title}</div>
//             <div>桌名:{info.name}</div>
//         </div>
//     )
// }
  // 列表组件,声明在父组件里面出现错误
function MenuItem({food,onUpdate,amount}) {
    // var [count, setCount] = useState(amount)
    // useEffect()
    function dec() {
        if (amount === 0) {
            return
          }
          
          onUpdate(food, amount - 1)
        // setCount(count - 1)
        // onUpdate(food,count-1)
    }
    function inc() {
 
  onUpdate(food, amount + 1)
        // setCount(count + 1)
        // onUpdate(food,count+1)
    }
    return (
        <div >
        <div className='menuItemStyle'>
            <img className='imgStyle' src={`http://${host}:5000/upload/` + food.img} alt={food.name} />
            <div className='menuItem1'>
            <h2>{food.name}</h2>
            <h4>描述：{food.desc}</h4>
            <h3>价格：{food.price}</h3>
            </div>
            <div className='menuItem2'>
            <Button type="primary" shape="circle" onClick={dec} >-</Button>
            {/* disabled={count === 0 ? true : false} */}
            <span><strong>{amount}</strong></span>
            <Button type="primary" shape="circle" onClick={inc} >+</Button>
            </div>
        </div>
        <div style={{width:'85vw',borderBottom:'1px solid',margin:'0 auto'}}></div></div>
    )
 }

 //
 function CartStatus(props){
    var [expand, setExpand] = useState(false)
    // console.log(props.foods)
    var totalPrice = calcTotalPrice(props.foods)
    // var did=props.match.params.did
    return (
        <div className='CartStatus'>
        {/* {expand ?
        <button onClick={() => setExpand(false)}>收起</button> :
        <button onClick={() => setExpand(true)}>展开</button>  } */}
        {/* <Suspense fallback='获取餐厅信息'>
        <DeskInfo did={did}></DeskInfo>
        </Suspense> */}
        总价：{totalPrice} 元
        <div className='CartStatusButton' onClick={() => props.onPlaceOrder()}>下单</div>
      
        </div>
      )
}

function calcTotalPrice(cartAry) {
    return cartAry.reduce((total, item) => {
      return total + item.amount * item.food.price
    }, 0)
  }

export default class FoodCart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cart:[],
            foodMenu:[],
            deskInfo:{},
            val:0
         }
    }
    componentWillMount() {
        console.log('componentWillMount');
        this.setState({
          val:this.state.val+1
        })
        
        console.log(1);
        
        
      }
      componentDidUpdate(){
        console.log('componentDidUpdate');
        
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return this.staet!=nextState
      }

      
      componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    
      }
    componentDidMount() {
        console.log('componentDidMount');

        var params=this.props.match.params
        api.get('/deskinfo?did=' + params.did).then(val => {
            this.setState({
                deskInfo:val.data
            })
            
          })


          api.get('/menu/restaurant/' +params.rid).then(res=>{
              this.setState({
                foodMenu:res.data
              })
          })


        this.socket=io(`ws://${host}:5000/`)
         this.socket.on('connect',()=>{
            console.log(111111111111111)
            this.socket.emit('join desk','desk:'+params.did)
        
        this.socket.on('cart food',info=>{
            console.log(info)
            this.setState(produce(state=>{
                state.cart.push(...info)
            }))
        })
        this.socket.on('new food',info=>{
            console.log(info)
            this.foodChange(info.food,info.amount)
        })
        this.socket.on('placeorder success', order => {
            history.push({
              pathname: `/r/${params.rid}/d/${params.did}/order-success`,
              state: order,
            })
          })
        })
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');

        this.socket.close()
      }

      cartChange=(food,amount)=>{
        var params=this.props.match.params
        this.socket.emit('new food',{desk:'desk:'+params.did,food,amount})

    }
    foodChange=(food,amount)=>{
        // this.socket.emit('new food',{food,amount})
        var updated=produce(this.state.cart,cart=>{
            var idx=cart.findIndex(it=>it.food.id===food.id)
            if(idx>=0){
                if(amount===0){
                    cart.splice(idx,1)
                }else{
                    cart[idx].amount=amount
                }
            }else{
                cart.push({
                    food,
                    amount,
                })
            }
        })
        this.setState({
            cart:updated
        })
    }

    placeOrder=()=>{
        var params=this.props.match.params
        if(this.state.cart.length==0){return }
        //  var params={...this.props,
        //      did:this.props.did,
        //      rid:this.props.rid,
        //      count:this.props.count}
        //  console.log('下单',params)
         api.post(`/restaurant/${params.rid}/desk/${params.did}/order`, {
             deskName: this.state.deskInfo.name,
             count: params.count,
             totalPrice: calcTotalPrice(this.state.cart),
             foods: this.state.cart,
           }).then(res=>{
              history.push({
                 pathname: `/r/${params.rid}/d/${params.did}/order-success`,
                 state: res.data,
               })
           })
        
 }

    render() { 

        return (  
            <div className='Foodcart'>
        <div>
        {
        
        this.state.foodMenu.map(food => {

            var currentAmount = 0
            var currFoodCartItem = this.state.cart.find(cartItem => cartItem.food.id === food.id)
            if (currFoodCartItem) {
              currentAmount = currFoodCartItem.amount
            }

            return <MenuItem key={food.id} food={food} amount={currentAmount} onUpdate={this.cartChange}/>
          })
        }
        <div>
            <br></br><br></br><br></br><br></br>
        </div>
        </div>
        <CartStatus foods={this.state.cart} onUpdate={this.cartChange} onPlaceOrder={this.placeOrder}></CartStatus>
    </div>
        );
    }
}



