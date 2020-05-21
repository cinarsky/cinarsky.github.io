import Vue from 'vue';
// axios并非vue的一个插件，如果需要使用需要安装vue-axios
// import axios from 'axios';
// import vueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://47.96.148.104',
}));

Vue.use(MintUI);
Vue.use(ElementUI);


// 使用vueAxios和axios,但是由于对发axios请求全局带cookies的需求，
// 自己封装了一个api.js
// Vue.use(vueAxios, axios);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
