<template>
	<header id="header">
	  <div class="mainHeader">
	    <el-col :span="4" class="logo"><a href="/">拾景</a></el-col>
	    <el-col :span="10">
	      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
	        <el-submenu index="1">
	          <template slot="title">我的技术</template>
	          <el-menu-item index="1-1">ES6</el-menu-item>
	          <el-menu-item index="1-2">Nodejs</el-menu-item>
	          <el-menu-item index="1-3">Vuejs</el-menu-item>
	          <el-menu-item index="1-4">Reactjs</el-menu-item>
	        </el-submenu>
	        <el-menu-item index="2" @click="headGoTo('allPost')">我的收藏</el-menu-item>
	        <el-submenu index="3">
	          <template slot="title">大杂烩</template>
	          <el-menu-item index="more/31" @click="headGoTo('more31')" >爬取cnode</el-menu-item>
            <el-menu-item index="more/32" @click="headGoTo('more32')" >时间组件</el-menu-item>
            <el-menu-item index="more/33" @click="headGoTo('more33')" v-if="userInfo">写文章</el-menu-item>
            <el-menu-item index="more/34" @click="headGoTo('more34')" v-if="userInfo">聊天群</el-menu-item>
	        </el-submenu>
	      </el-menu>
	    </el-col>
	    <el-col :span="6" style="padding:11px 0">
	        <el-input placeholder="搜索一下" icon="search" v-model="search" :on-icon-click="handleIconClick"></el-input>
	    </el-col>
	    <el-col :span="4" style="padding:11px 0;text-align:right" v-if="!userInfo">
        <el-button type="text" size="large">
          <router-link to="/login">登录</router-link>
        </el-button>
	      <el-button type="text" size="large">
          <router-link to="/reg">注册</router-link>
        </el-button>
	    </el-col>
	    <el-col :span="4" style="padding:11px 0;text-align:right" v-else>
	      <el-button type="text" size="large">
          <router-link :to="{path:'/'}">{{userInfo.username}}</router-link>
        </el-button>
        <el-button type="text" size="large" @click="logout">退出</el-button>
	    </el-col>
	  </div>
	</header>
</template>

<script>
  import { mapState,mapActions } from 'vuex'
  export default {
    name:'head',
    data(){
        return {
            activeIndex:'',
            search:''
        }
    },
    computed:{
      ...mapState([
        'userInfo'
      ])
    },
    methods:{
      ...mapActions([
        'setUserInfo','delUserInfo'
      ]),
      handleIconClick(){
        this.$router.push({name:'search',query:{keyword:this.search}})
      },
      logout(){
        this.delUserInfo();
      },
      headGoTo(name){
        this.$router.push({name:name})
      }
    },
    mounted(){
      this.setUserInfo()
    }
  }
</script>

<style>
#header{
  width:100%;
  background:#324157;
  height:60px;
}
#header .mainHeader{
  width:1000px;
  margin:0 auto;
}
#header .logo{
  height:60px;
  line-height:60px;
  padding:0 20px;
  font-size:30px;
}
#header a{
  color:#F9FAFC;
}
</style>