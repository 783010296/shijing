import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import home from '../page/home/home'
import pretice31 from '../components/3-1.vue'
import login from '../page/login/login'
import reg from '../page/reg/reg'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [{
      path:'',
      name:'home',
      component:home
    },{
      path:'/login',
      name:'login',
      component:login
    },{
      path:'/reg',
      name:'reg',
      component:reg
    }]
  }]
})
/*routes: [
  {
    path: '/',
    name: 'home',
    component: home
  },{
    path: '/pretice/31',
    name:'pretice31',
    component: pretice31
  },{
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/reg',
    name: 'reg',
    component: reg
  }
]*/