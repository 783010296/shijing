<template>
  <div>
    <head-Top></head-Top>
    <div id="more34">
      <div class="more34Box" ref="more34Box">
        <div v-bind:class="[allmsg.isMe ? 'boxContentRight' : 'boxContentLeft']" v-for="allmsg in allMsgs">
          <img src="../../../../static/head1.jpg"></img>
          <div>
            <span>{{allmsg.name}}</span>
            <div>{{allmsg.msg}}</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="msg">
          <el-button slot="append" type="primary" @click="send"> 发送 </el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from '../../components/head'
  import { addPost } from '../../service/getData'
  import io from 'socket.io-client';
  const socket = io();
  export default {
    data(){
      return {
        msg:"",
        allMsgs:[],
        name:""
      }
    },
    methods:{
      send(){
        let _this = this;
        if(_this.msg.trim()){
          let currentMsg = {
            name:_this.name,
            msg:_this.msg.trim(),
            isMe:false,
            name:_this.name
          }
          socket.emit('sendMsg', currentMsg)
          this.addMsg(currentMsg)
        }
      },
      addMsg(msg){
        msg.isMe = true
        this.allMsgs.push(msg)
        this.msg = "";
      }
    },
    watch:{
      allMsgs(){
        this.$nextTick(() => {
          let list = this.$refs.more34Box
          list.scrollTop = list.scrollHeight
        })
      }
    },
    mounted(){
      let _this = this;
      socket.on('getMsg', function(data){
        _this.allMsgs.push(data);
      });
      this.$prompt('请输入您的昵称', '提示', {
        confirmButtonText: '确定',
        inputPattern: /\S+/,
        inputErrorMessage: '格式不正确',
        showCancelButton:false,
        closeOnPressEscape:false,
        closeOnClickModal:false,
        showClose:false
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的昵称是: ' + value
        })
        this.name = value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    components:{
      headTop
    }
  }

</script>

<style scoped>
#more34{
  width:600px;
  margin:0 auto;
  margin-top:15px;
  margin-bottom:30px;
}
.more34Box{
  height:500px;
  border:1px solid #d0d0d0;
  border-radius:5px;
  padding: 0 20px;
  overflow:auto;
}

.boxContentLeft{
  overflow:hidden;
  margin:15px 0;
}
.boxContentLeft span{
  display:block;
  text-align:left;
  width:100%;
}
.boxContentLeft>img{
  float:left;
  display:block;
  width:50px;
  height:50px;
  border:1px solid #d0d0d0;
}
.boxContentLeft>div{
  float:left;
}
.boxContentLeft>div>div{
  background:#36c8f3;
  line-height:50px;
  margin-left:30px;
  position:relative;
  padding:0 20px;
  max-width:400px;
}
.boxContentLeft>div>div:before{
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #36c8f3;
  position: absolute;
  top: 13px;
  left: -20px;;
}
.boxContentRight{
  overflow:hidden;
  margin:15px 0;
}
.boxContentRight span{
  display:block;
  text-align:right;
  width:100%;
}
.boxContentRight>img{
  float:right;
  display:block;
  width:50px;
  height:50px;
  border:1px solid #d0d0d0;
}
.boxContentRight>div{
  float:right;
}
.boxContentRight>div>div{
  background:#36c8f3;
  line-height:50px;
  margin-right:30px;
  position:relative;
  padding:0 20px;
  max-width:400px;
}
.boxContentRight>div>div:after{
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 10px solid #36c8f3;
  border-bottom: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  top: 13px;
  right: -20px;;
}
</style>