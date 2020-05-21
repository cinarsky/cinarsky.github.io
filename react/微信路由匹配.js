import React from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
// import { createHashHistory} from 'history'
// var history=createHashHistory()
export default function App() {
  return (
    <Router >
      <div>
        <Redirect push to="/Wx" />
        <Switch>
          <Route path="/Wx">
            <Wx />
          </Route>
          <Route path="/pyq">新的朋友圈</Route>
          <Route path="/topics">新的朋友圈</Route>
          <Route path='/Wx/xx' component={Xx}></Route>
        </Switch>
        </div>
      </Router>
  );
}


function Wx() {

  return (
    <div>
      <Link to="/Wx/xx">消息</Link>--
      <Link to='/Wx/lx'>联系人</Link>--
      <Link to='/Wx/pyq'>朋友圈</Link>--
      <Link to='/Wx/wo'>我的</Link>
      <hr />
      <Switch>
        <Route path='/Wx/xx' component={Xx}></Route>
        <Route path='/Wx/lx' component={Lx}></Route>
        <Route path='/Wx/pyq' component={Pyq}></Route>
        <Route path='/Wx/wo' component={Main}></Route>
      </Switch>
    </div>
  );
}
function Xx() {
  return (
     <div>消息</div>

  );
}
function Lx() {
  return (
     <div>联系人</div>

  );
}
function Pyq() {
  return (
    <div><Link to="/topics">topics</Link></div>

 );
}
function Main() {
  return (
    <div>朋友圈</div>

 );
  
}

