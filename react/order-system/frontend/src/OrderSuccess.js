import React from 'react';

export default (props)=>{
    console.log(props)
return (
    <div>
    <h2>下单成功</h2>
    <p>消费金额 ：<strong>{props.location.state?props.location.state.totalPrice:0}元</strong></p>
    </div>
)
}