import Vue from 'vue'
import Router from 'vue-router'

const App = r => require.ensure([], () => r(require('../App')), 'app')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const reg = r => require.ensure([], () => r(require('../page/reg/reg')), 'reg')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const more31 = r => require.ensure([], () => r(require('../page/more/3-1')), 'more31')
const more32 = r => require.ensure([], () => r(require('../page/more/3-2')), 'more32')
const more33 = r => require.ensure([], () => r(require('../page/more/3-3')), 'more33')
const notfound = r => require.ensure([], () => r(require('../page/error/notfound')), 'notfound')
const allPost = r => require.ensure([], () => r(require('../page/post/allPost')), 'allPost')
const onePost = r => require.ensure([], () => r(require('../page/post/post')), 'onePost')

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
      path:'/more/33',
      name:'more33',
      component:more33
    },{
      path:'/post',
      name:'allPost',
      component:allPost
    },{
      path:'/post/:code',
      name:'onePost',
      component:onePost
    },{
      path:'*',
      component:notfound
    }]
  }]
})