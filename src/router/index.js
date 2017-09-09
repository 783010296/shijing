import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import login from '../components/login'
import reg from '../components/reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/reg',
      name: 'reg',
      component: reg
    }
  ]
})
