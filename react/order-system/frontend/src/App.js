import React from 'react';
import {Router as Router, Route,Switch,Link} from 'react-router-dom';
import './App.css';
import LandingPage from'./LandingPage';
import FoodCart from'./FoodCart';
import Restaurantanage from'./Restaurantanage';
import Login from'./Login';
import HomePage from'./HomePage';
import Register from'./Register';
import history from'./history';
import OrderSuccess from'./OrderSuccess';
// function setRootFontSize() {
//   var width = document.documentElement.clientWidth || document.body.clientWidth;
//   var fontSize = (width / 10);
//   console.log(fontSize)
//   document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px';
// }
// setRootFontSize();
// window.addEventListener('resize', function() {
//   setRootFontSize();
// }, false)

function App() {
  return (
    <div >
<Router history={history}>
  
   <Switch>
     <Route path='/'  exact component={HomePage}/> 
     <Route path='/landing/r/:rid/d/:did' component={LandingPage}/>
     <Route path='/r/:rid/d/:did/c/:count' component={FoodCart}/>
     <Route path='/r/:rid/d/:did/order-success' component={OrderSuccess}/>
     <Route path="/restaurant/:rid/manage/" component={Restaurantanage} />
     <Route path='/login' component={Login}/>
     <Route path='/register' component={Register}/>
   </Switch>
</Router>
</div>
  );
}

export default App;
