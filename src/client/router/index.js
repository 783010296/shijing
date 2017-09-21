import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'
import home from '../page/home/home'
import login from '../page/login/login'
import reg from '../page/reg/reg'
import search from '../page/search/search'
import more31 from '../page/more/3-1'
import notfound from '../page/error/notfound'

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
      path:'/more',
      children:[{
        path:'31',
        name:'more31'
        component:more31
      }]
    },{
      path:'*',
      name:'home',
      component:home
    }]
  }]
})