<template>
  <div>
    <header id="header">
      <div class="mainHeader">
        <el-col :span="4" class="logo"><a href="#/">拾景</a></el-col>
        <el-col :span="11">
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">我的技术</el-menu-item>
            <el-menu-item index="2">我的问题</el-menu-item>
            <el-menu-item index="3">我的收藏</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6" style="padding:11px 0">
            <el-input placeholder="搜索一下" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
        </el-col>
        <el-col :span="3" style="padding:11px 0;padding-left:30px;color:red">
          <el-button type="text" size="large"><a href="#/login">登录</a></el-button>
          <el-button type="text" size="large"><a href="#/reg">注册</a></el-button>
        </el-col>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  name:'app',
  data(){
      return {
          activeIndex:null,
          input2:""
      }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleIconClick(){}
  }
}
</script>

<style>
/*公用类的样式*/
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
*,li,ul,dl,dt,dd{margin:0;padding:0}
li,ol,ul,dl,dt,dd{list-style:none;list-style-type:none}
a,h1,img,p{border:0}
cite,em,i{font-style:normal;}
input[type=password]{box-sizing: border-box;}
input:focus{outline:none;}
a{color:#666;text-decoration:none;}
a:hover{text-decoration:none;}/*鼠标悬停时*/
.clearfix{display:block}
* html .clearfix{height:1%}
.clearfix:after{display:block;visibility:hidden;clear:both;height:0;content:'\20'}
.mt10{margin-top:10px}
.blue{color:#00b9ef}
.oran{color:#f4ab2e}
.clear{clear:both}
.center{text-align:center}
.none{display:none}
.fl{float:left;}
.fr{float:right}
.mid{ float: left}
#header{
  width:100%;
  background:#324157;
  height:60px;
}
#header .mainHeader{
  width:1000px;
  margin:0 auto;
  overflow:hidden;
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
