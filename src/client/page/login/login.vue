<template>
	<div>
		<head-top></head-top>
		<div id="loginBox">
			<el-form :model="loginBoxForm" :rules="loginRule" ref="loginBoxForm" label-width="100px" class="loginBoxMain">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="loginBoxForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="loginBoxForm.password" auto-complete="off" placeholder="请输入6-12位密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :span='10' type="primary" @click="submitForm('loginBoxForm')">登录</el-button>
					<el-button :span='10' @click="resetForm('loginBoxForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/head'
	import {mapActions} from 'vuex'
	import { login } from '../../service/getData'
	export default {
	  data() {
	    var validateUsername = (rule,value,callback)=>{
	      if(value === ''){
	        return callback(new Error('用户名不能为空'));
	      }
	      if(value.length !== 11){
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
	    return {
	      loginBoxForm: {
	        username: '',
	        password: ''
	      },
	      loginRule: {
	        username: [
	          { validator: validateUsername, trigger: 'blur' }
	        ],
	        password: [
	          { validator: validatePassword, trigger: 'blur' }
	        ]
	      }
	    };
	  },
	  components:{
			headTop
		},
	  methods: {
	    ...mapActions([
	      'setUserInfo'
	    ]),
	    submitForm(formName) {
	    	let _this = this;
	      	_this.$refs[formName].validate((valid) => {
	        if (valid) {
	        	login(_this.loginBoxForm).then(user=>{
	        		if(user.key){
								_this.setUserInfo()
		            console.log(user)
		            _this.$notify({
				          title: '登录成功',
				          message: '这是一条成功的提示消息',
				          type: 'success',
				          duration:'3000',
				          onClose:function(){
				          	_this.$router.push("/")
				          }
				        });
	        		}else{
	        			_this.$notify({
				          title: '登录失败',
				          message: user.err,
				          type: 'error',
				          duration:'3000'
				        });
	        		}
	          	
	          }).catch(err=>{
	            console.log(err)
	            
	          })
	        } else {
	          console.log('error LOGIN!!');
	          return false;
	        }
	      });
	    },
	    resetForm(formName) {
	      this.$refs[formName].resetFields();
	    }
	  },
	  mounted(){
	    //document.getElementById("loginBox").style.height = (document.documentElement.clientHeight-60)+'px';
	  }
	}
</script>
<style>
	#loginBox{

	  overflow:hidden;
	}
	.loginBoxMain{
	  width:350px;
	  margin:100px auto;
	}
</style>