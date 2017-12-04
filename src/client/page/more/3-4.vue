<template>
  <div>
    <head-Top></head-Top>
    <div id="more34">
      <div class="more34Box" ref="more34Box">
        <div v-bind:class="[allmsg.isMe ? 'boxContentRight' : 'boxContentLeft']" v-for="allmsg in allMsgs">
          <img :src="allmsg.myheadUrl"></img>
          <div>
            <span>{{allmsg.name}}</span>
            <div>{{allmsg.msg}}</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="msg" @keyup.enter.native="send">
          <el-button slot="append" type="primary" @click="send" > 发送 </el-button>
        </el-input>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="myFasle" :close-on-press-escape="myFasle" :show-close="myFasle" >
      <el-form>
        <el-form-item label="请输入昵称并选择头像">
          <el-input v-model="name" auto-complete="off"></el-input>
        </el-form-item>
        <div>
          <el-radio-group v-model="radio" @change="radioChange">
            <el-radio label="1" border>男生</el-radio>
            <el-radio label="0" border>女生</el-radio>
          </el-radio-group>
          <img :class="[key==myHead?'headActive':'','headImg']"" v-for="(head, key) in heads" :src="head" @click="headChange(key)">
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>
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
        msg:'',
        allMsgs:[],
        name:'',
        dialogFormVisible:true,
        radio:'1',
        heads:[],
        myHead:0,
        myheadUrl:"",
        girlHeads:[
          'http://img5.duitang.com/uploads/item/201412/17/20141217124439_EmxBP.jpeg',
          'https://img.qq1234.org/uploads/allimg/150403/15052U595-3.jpg',
          'http://dynamic-image.yesky.com/600x-/uploadImages/upload/20140905/xnqtzgkk5y4png.png',
          'http://f.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=4b4e573efdfaaf5184b689b9bc64b8d6/1b4c510fd9f9d72ae50cef05d42a2834349bbbba.jpg',
          'http://cms-bucket.nosdn.127.net/95c6aa17499f4733b0a94ef65ced316320171204135750.jpeg'
        ],
        boyHeads:[
          'http://a3.att.hudong.com/25/88/01300543064509142398886939232_s.jpg',
          'http://9.pic.9ht.com/thumb/up/2016-7/14692393177295271_600_566.jpg',
          'http://m.vstou.com/img/201506/2d59d109b3de9c82b5d349c76c81800a18d843c1.jpg',
          'http://i0.sinaimg.cn/ty/s/2012-01-11/1326214455_X0EHbR.jpg',
          'http://www.touxiangdaquan.net/uploads/allimg/c150407/142S91CQ5K0-456054.jpg'
        ],
        myFasle:false
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
            name:_this.name,
            myheadUrl:_this.myheadUrl
          }
          socket.emit('sendMsg', currentMsg)
          this.addMsg(currentMsg)
        }
      },
      addMsg(msg){
        msg.isMe = true
        this.allMsgs.push(msg)
        this.msg = ""
      },
      radioChange(){
        if(this.radio == '1'){
          this.heads = this.boyHeads
          this.myHead = 0
        }
        if(this.radio == '0'){
          this.heads = this.girlHeads
          this.myHead = 0
        }
        this.myheadUrl = this.heads[this.myHead]
      },
      headChange(key){
        this.myHead = key
        this.myheadUrl = this.heads[this.myHead]
      },
      dialogSure(){
        if(/\S+/.test(this.name.trim())){
          this.name = this.name.trim()
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '你的昵称是: ' + this.name
          })
          socket.emit('coming', this.name)
        }else{
          this.$message.error('错了哦，昵称不能为空');
        }
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
      this.radioChange()
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
  overflow:hidden;n
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
</style>