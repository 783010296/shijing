<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name:'app',
    data(){
      return {

      }
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
</style>