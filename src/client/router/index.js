import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import home from '../page/home/home'
import login from '../page/login/login'
import reg from '../page/reg/reg'
import search from '../page/search/search'
import more31 from '../page/more/3-1'
import more32 from '../page/more/3-2'
import notfound from '../page/error/notfound'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [{
    path: '/',
    component: App,
    children: [{
      path:'',
      component:home
    },{
      path:'/home',
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
    },{
      path:'/search',
      name:'search',
      component:search
    },{
      path:'/more/31',
      name:'more31',
      component:more31
    },{
      path:'/more/32',
      name:'more32',
      component:more32
    },{
      path:'*',
      component:home
    }]
  }]
})