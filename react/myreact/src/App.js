import React,{useEffect,useState} from 'react'
import logo from './logo.svg';
import {Router as Router, Route,Switch,Link} from 'react-router-dom';
import './App.css';
import Login from './login.js'
import Manage from './manage.js'
import history from'./history';
function App() {
  return (
    <div >
      
<Router history={history}>
   <Switch>
     <Route path='/'  exact component={Login}/> 
     {/* <Route path='/manage' component={Manage}/> */}
   </Switch>
</Router>
</div>
  );
}

export default App;
