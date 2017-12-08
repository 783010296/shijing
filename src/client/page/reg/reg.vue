<template>
	<div>
		<head-top></head-top>
		<div id="regBox">
			<el-form :model="regBoxForm" :rules="regRule" ref="regBoxForm" label-width="100px" class="regBoxMain">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="regBoxForm.username" auto-complete="off" placeholder="请输入6-12数字或字母组成的用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="regBoxForm.password" auto-complete="off" placeholder="请输入6-12位密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="regBoxForm.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickName">
					<el-input v-model="regBoxForm.nickName" auto-complete="off" placeholder="请输入你的昵称"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="imgUrl">
					<img :class="[key==myHead?'headActive':'','headImg']"" v-for="(head, key) in heads" :src="head" @click="headChange(key)">
				</el-form-item>
				<el-form-item>
					<el-button :span='10' type="primary" @click="submitForm('regBoxForm')">注册</el-button>
					<el-button :span='10' @click="resetForm('regBoxForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/head'
	import { reg } from '../../service/getData'
	export default {
	  data() {
	    var validateUsername = (rule,value,callback)=>{
	      if(value === ''){
	        return callback(new Error('用户名不能为空'));
	      }
	      if((value.length < 6)||(value.length >12)){
	        return callback(new Error('请输入正确的用户名'));
	      }
	      return callback();
	    }
	    var validatePassword = (rule,value,callback)=>{
	      if(value === ''){
	        return callback(new Error('密码不能为空'));
	      }
	      if((value.length<6)||(value.length>12)){
	        return callback(new Error('请输入6-12位密码'));
	      }
	      return callback();
	    }
	    var validateCheckPass = (rule,value, callback) => {
	      if (value === '') {
	        return callback(new Error('请再次输入密码'));
	      } else if (value !== this.regBoxForm.password) {
	        return callback(new Error('两次输入密码不一致!'));
	      } else {
	        return callback();
	      }
	    }
	    var validateNickName = (rule,value, callback) => {
	      if (/^\S+$/.test(value.trim())) {
	      	return callback(new Error('请输入昵称'));
	      } else {
	        return callback();
	      }
	    }
	    return {
	      regBoxForm: {
	        username: '',
	        password: '',
	        checkPass:'',
	        nickName:'',
	        imgUrl:''
	      },
	      regRule: {
	        username: [
	          { validator: validateUsername, trigger: 'blur' }
	        ],
	        password: [
	          { validator: validatePassword, trigger: 'blur' }
	        ],
	        checkPass: [
	          { validator: validateCheckPass, trigger: 'blur' }
	        ],
	      },
	      heads:[
	      'http://scimg.jb51.net/allimg/160706/103-160F6095531355.jpg',
          'https://img.qq1234.org/uploads/allimg/150403/15052U595-3.jpg',
          'http://dynamic-image.yesky.com/600x-/uploadImages/upload/20140905/xnqtzgkk5y4png.png',
          'http://f.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=4b4e573efdfaaf5184b689b9bc64b8d6/1b4c510fd9f9d72ae50cef05d42a2834349bbbba.jpg',
          'http://cms-bucket.nosdn.127.net/95c6aa17499f4733b0a94ef65ced316320171204135750.jpeg',
          'http://a3.att.hudong.com/25/88/01300543064509142398886939232_s.jpg',
          'http://9.pic.9ht.com/thumb/up/2016-7/14692393177295271_600_566.jpg',
          'http://m.vstou.com/img/201506/2d59d109b3de9c82b5d349c76c81800a18d843c1.jpg',
          'http://i0.sinaimg.cn/ty/s/2012-01-11/1326214455_X0EHbR.jpg',
          'http://www.touxiangdaquan.net/uploads/allimg/c150407/142S91CQ5K0-456054.jpg'
        ],
        myHead:0
	    };
	  },
	  components:{
			headTop
		},
	  methods: {
	    submitForm(formName) {
	    	let _this = this
	      _this.$refs[formName].validate((valid) => {//valid is boolean
	        if (valid) {
	        	console.log(_this.regBoxForm)
	        	reg(_this.regBoxForm).then((user)=>{
	        		if(user.key){
		        		console.log(user)
		            _this.$notify({
				          title: '注册成功',
				          message: '这是一条成功的提示消息',
				          type: 'success',
				          duration:'3000',
				          onClose:function(){
				          	_this.$router.push("/")
				          }
				        });
				      }else{
				      	_this.$notify({
				          title: '注册失败',
				          message: user.err,
				          type: 'error',
				          duration:'3000'
				        });
	        		}
	            
	          }).catch((err)=>{
	            console.log(err)
	            _this.$notify({
			          title: '注册失败',
			          message: err,
			          type: 'error',
			          duration:'3000'
			        });
	          })
	        } else {
	          console.log('error reg!!');
	          return false;
	        }
	      });
	    },
	    resetForm(formName) {
	      this.$refs[formName].resetFields();
	    },
	    headChange(key){
        this.myHead = key
        this.regBoxForm.imgUrl = this.heads[this.myHead]
      },
	  },
	  mounted(){
	    //document.getElementById("regBox").style.height = (document.documentElement.clientHeight-60)+'px';
	    this.regBoxForm.imgUrl = this.heads[this.myHead]
	  }
	}
</script>
<style>
	#regBox{

	  overflow:hidden;
	}
	.regBoxMain{
	  width:350px;
	  margin:100px auto;
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