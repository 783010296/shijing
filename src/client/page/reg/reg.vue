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
	    };
	    return {
	      regBoxForm: {
	        username: '',
	        password: '',
	        checkPass:''
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
	      }
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
	    }
	  },
	  mounted(){
	    document.getElementById("regBox").style.height = (document.documentElement.clientHeight-60)+'px';
	  }
	}
</script>
<style>
	#regBox{
	  height:100%;
	  width:100%;
	  background: url("../../images/background.jpg") no-repeat center;
	  background-size:100%;
	  overflow:hidden;
	}
	.regBoxMain{
	  width:350px;
	  margin:100px auto;
	}
</style>