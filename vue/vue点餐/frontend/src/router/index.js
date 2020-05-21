/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from '../components/Mainpage.vue';
import Login from '../views/Login.vue';
import Register from '../components/Register.vue';
import Forget from '../components/Forget.vue';
import ChangePW from '../components/ChangePW.vue';
import LandingPage from '../views/LandingPage.vue';
import FoodCart from '../views/FoodCart.vue';
import RestaurantManage from '../views/RestaurantManage.vue';
import ManageOrders from '../components/ManageOrders.vue';
import ManageFood from '../components/ManageFood.vue';
import ManageDesks from '../components/ManageDesks.vue';
import OrderDetails from '../components/OrderDetails.vue';
import AddFood from '../components/AddFood.vue';
import OrderSuccess from '../components/OrderSuccess.vue';
import AddDesk from '../components/AddDesk.vue';
import Resume from '../views/Resume.vue';

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(VueRouter);


// 用户侧
// 扫码进入的页面，选择人数 /landing/restaurant/3/desk/2
// 点餐页面                /restaurant/3/desk/2
// 点餐成功页面             /

// 商户侧
// 登陆注册页面   /;  /login; /register
// 订单管理     /manage/order
// 订单详情页面 /manage/order/35
// 菜品管理     /manage/food
// 桌面管理     /manage/desk

const routes = [
  {
    path: '/',
    name: 'Resume',
    component: Resume,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget,
  },
  {
    path: '/change-password/:token',
    name: 'changePW',
    component: ChangePW,
  },
  {
    path: '/manage/:rid',
    name: 'restaurantManage',
    component: RestaurantManage,
    children: [
      { path: 'mainpage', component: MainPage },
      { path: 'orders', component: ManageOrders },
      { path: 'order/:oid', component: OrderDetails },
      { path: 'food', component: ManageFood },
      { path: 'desks', component: ManageDesks },
      { path: 'add-food', component: AddFood },
      { path: 'add-desk', component: AddDesk },
    ],
  },
  {
    path: '/r/:rid/d/:did',
    name: 'foodCart',
    component: FoodCart,
  },
  {
    path: '/r/:rid/d/:did/order-success',
    name: 'orderSuccess',
    component: OrderSuccess,
  },
  {
    path: '/landing/r/:rid/d/:did',
    name: 'landingPage',
    component: LandingPage,
  },
];

const router = new VueRouter({
  // history模式可以使#消失，但是其弊端是无法自由输入页面进行跳转
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
