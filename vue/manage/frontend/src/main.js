import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import {Button,RadioGroup,RadioButton,Menu,Submenu,MenuItemGroup,MenuItem,Form,FormItem,Input,Message,Container,Header,Main,Aside,Table,TableColumn} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.config.productionTip = false
var axios1=axios.create({
  baseURL: 'http://localhost:5666/api/',
  timeout: 2000,
  withCredentials:true
})
Vue.prototype.axios=axios1
Vue.prototype.$message=Message
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
