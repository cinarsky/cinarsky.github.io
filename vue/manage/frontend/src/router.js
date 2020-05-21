import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Mine from './components/Mine'
import Done from './components/Done'
import Todo from './components/Todo'
Vue.use(VueRouter)


const routes = [
  { path: '/',  redirect: '/login'  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home,children:[
    { path: 'mine',  component: Mine  },
    { path: 'done',  component: Done  },
    { path: 'todo',  component: Todo  },
  ]},
]


const router = new VueRouter({
  routes
})

export default router

