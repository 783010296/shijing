<template>
    <div>
        <header>
            <div class="mainHeader">
                <el-col :span="4" class="logo">上善若水</el-col>
                <el-col :span="10">
                    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-menu-item index="2">第二个按钮</el-menu-item>
                        <el-menu-item index="3">订单管理</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6" style="padding:11px 0">
                    <el-input placeholder="搜索一下" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
                </el-col>
                <el-col :span="4" style="padding:11px 0;padding-left:60px;">
                    <el-button type="text" size="large"><a href="#/login">登录</a></el-button>
                    <el-button type="text" size="large">注册</el-button>
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
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
header{
    width:100%;
    background:#324157;
    height:60px;
}
.mainHeader{
    width:1000px;
    margin:0 auto;
}
header .logo{
    height:60px;
    line-height:60px;
    padding:0 20px;
    color:#F9FAFC;
    font-size:30px;
}
</style>
