import React from 'react';
import {HashRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
import './App.css';
import './main.scss';
// import { createHashHistory} from 'history'
import Login from './Login'
import Content from './Content'
import FindRoommate from './FindRoommate'
import FindHouse from './FindHouse'
import NewArticle from './NewArticle'
import Article from './Article'
import Minearticle from './Minearticle'
import Minestore from './Minestore'
import host from './host'
function App() {
  return (
    <Router >
      <Redirect push to="/login" />
    <Switch>
      <Route path='/content/'   component={Content}/>
      {/* <Route path='/findroommate' component={FindRoommate}/>
      <Route path='/findhouse' component={FindHouse}/> */}
      <Route path='/newarticle' component={NewArticle}/>
      <Route path='/article/detail/:aid' component={Article}/>
      <Route path='/article/mine/' component={Minearticle}/>
      <Route path='/article/minestore/' component={Minestore}/>
      <Route path='/login'  component={Login}/> 
    </Switch>
 </Router>
  );
}

export default App;
