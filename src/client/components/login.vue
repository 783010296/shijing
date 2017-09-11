<template>
	<div id="loginBox">
		<el-form :model="loginBoxForm" :rules="loginRule" ref="loginBoxForm" label-width="100px" class="loginBoxMain">
			<el-form-item label="手机" prop="username">
				<el-input v-model="loginBoxForm.username" auto-complete="off" placeholder="请输入手机号码"></el-input>
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
</template>
<script>
import {mapActions} from 'vuex'
import axios from 'axios'
export default {
  data() {
    var validateUsername = (rule,value,callback)=>{
      if(value === ''){
        return callback(new Error('手机号不能为空'));
      }
      if(value.length !== 11){
        return callback(new Error('请输入正确的手机号码'));
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
  methods: {
    ...mapActions([
      'login'
    ]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/user/login',{
            username:'212121212',
            password:'12121221212'
          }).then()
          .catch(err=>{
            console.log(err);
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
    document.getElementById("loginBox").style.height = (document.documentElement.clientHeight-60)+'px';
  }
}
</script>
<style>
#loginBox{
  height:100%;
  width:100%;
  background: url("../images/background.jpg") no-repeat center;
  background-size:100%;
  overflow:hidden;
}
.loginBoxMain{
  width:350px;
  margin:100px auto;
}
</style>