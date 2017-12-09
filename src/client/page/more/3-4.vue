<template>
  <div>
    <head-Top></head-Top>
    <div id="more34">
      <div class="more34Box" ref="more34Box">
        <div v-bind:class="[allmsg.isMe ? 'boxContentRight' : 'boxContentLeft']" v-for="allmsg in allMsgs">
          <img :src="allmsg.myheadUrl"></img>
          <div>
            <span>{{allmsg.name}}</span>
            <div v-html="allmsg.msg"></div>
          </div>
        </div>
      </div>
      <el-popover
        ref="popover"
        placement="top"
        title="标题"
        width="600"
        trigger="click"
        v-model = "popoverValue">
        <img v-for="i in 68" :src="'http://hichat.herokuapp.com/content/emoji/'+(i+1)+'.gif'" class="emojiImg" @click="sendEmoji(i+1)">
      </el-popover>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="msg" @keyup.enter.native="send">
          <el-button slot="prepend" v-popover:popover>表情</el-button>
          <el-button slot="append" type="primary" @click="send" > 发送 </el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex'
  import headTop from '../../components/head'
  import { addPost } from '../../service/getData'
  import io from 'socket.io-client';
  const socket = io();
  export default {
    data(){
      return {
        msg:'',
        allMsgs:[],
        name:'',
        myheadUrl:"",
        emoji:1,
      }
    },
    computed:{
      ...mapState([
        'userInfo'
      ])
    },
    methods:{
      send(){
        let _this = this;
        if(_this.msg.trim()){
          let currentMsg = {
            name:_this.name,
            msg:_this.msg.trim(),
            isMe:false,
            myheadUrl:_this.myheadUrl
          }
          var match,reg = /\[emoji:(\d+)\]/g,result = currentMsg.msg;
          while (match = reg.exec(currentMsg.msg)) {
              result = result.replace(match[0], '<img class="emoji" src="http://hichat.herokuapp.com/content/emoji/' + match[1] + '.gif" />');
          };
          currentMsg.msg = result
          socket.emit('sendMsg', currentMsg)
          this.addMsg(currentMsg)
        }
      },
      addMsg(msg){
        msg.isMe = true
        this.allMsgs.push(msg)
        this.msg = ""
      },
      sendEmoji(i){
        this.emoji = i;
        this.msg += `[emoji:${i}]`
        this.popoverValue = false;
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
      })
      this.name = this.userInfo.nickName
      this.myheadUrl = this.userInfo.imgUrl
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
  padding-left:30px;
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
  margin-left:30px;
  position:relative;
  padding:10px 20px;
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
  padding-right:30px;
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
  margin-right:30px;
  position:relative;
  padding:10px 20px;
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
.headImg{
  display:inline-block;
  width:50px;
  height:50px;
  border:1px solid #d0d0d0;
  margin-left:20px;
}
.headActive{
  border:1px solid red;
}
.emojiImg{
  display:inline-block;
  width:40px;
  height:40px;
  margin:5px;
  border:1px solid #000;
}
.emojiImg:hover{
  border:1px solid #0825ff;
}
</style>