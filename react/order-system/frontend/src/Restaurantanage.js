import React,{Suspense,useState}from 'react'
import {Switch,Route,Link} from 'react-router-dom';
import OrderManage from'./OrderManage';
import FoodManage from'./FoodManage';
import DeskManage from'./DeskManage';
import api from './api';
import fetcher from './fetcher'
import history from './history'
import {withRouter} from 'react-router-dom'
import AddFood from './AddFood'
import AddDesk from './AddDesk'
import { Button } from 'antd';
// const userInfoFetcher=fetcher(async()=>{
//     return api.get('/userinfo').catch(()=>{
//         history.push('/')
//     })
// })

// 有疑问////////////////////////////////////////////////////////
function RestaurantInfo({rid}){
  var [title,setTitle]=useState('loading')
     api.post('/userinfo',{rid}).then(res=>{
      console.log(res)
      if(res.status==404){
        history.push('/')
      }else{
        setTitle(res.data.title)
      }
    })
// var info = userInfoFetcher.read().data
  
return (
  < h2>
    {
      '餐厅名： ' +title
    }
  </h2>
)
}

export default withRouter(function(props){
    async function logout(){
       await api.get('/logout')
       props.history.push('/')
    }
    return (
        <div className='Restaurantanage'>
            <nav>
           {/*疑问，回顾*/ }
              <Suspense fallback={<div>loading...</div>}>
              <RestaurantInfo rid={props.match.params.rid}/>
              </Suspense>
              <Button className='RestaurantanageLogout' onClick={logout}>登出</Button>
             <ul>
                 <li>
                 <Button>
                   <Link to='order'>订单管理</Link>
                   </Button>
                 </li>
                 <li> <Button><Link to='food'>菜品管理</Link></Button></li>
                 <li> <Button><Link to='desk'>桌面管理</Link></Button></li>
             </ul>
            </nav>
        <main>
        <Switch>
        <Route path="/restaurant/:rid/manage/order" component={OrderManage}/>
          <Route path="/restaurant/:rid/manage/food" component={FoodManage}/>
          <Route path="/restaurant/:rid/manage/desk" component={DeskManage}/>
          <Route path="/restaurant/:rid/manage/add-food" component={AddFood}/>
          <Route path="/restaurant/:rid/manage/add-desk" component={AddDesk}/>
        </Switch>
        </main>
        </div>
    )
})