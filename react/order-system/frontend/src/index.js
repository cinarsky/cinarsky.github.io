import React from 'react';
import ReactDOM from 'react-dom';
import api from './api'
import axios from 'axios'
import _ from 'lodash'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.api=api
window.axios=axios
window._=_
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
