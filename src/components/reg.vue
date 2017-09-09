<template>
	<div id="regBox">
		<el-form :model="regBoxForm" :rules="regRule" ref="regBoxForm" label-width="100px" class="regBoxMain">
			<el-form-item label="手机" prop="phone">
				<el-input v-model="regBoxForm.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
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
</template>
<script>
export default {
  data() {
    var validatePhone = (rule,value,callback)=>{
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
        phone: '',
        password: '',
        checkPass:''
      },
      regRule: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {//valid is boolean
        if (valid) {
          alert('reg!');
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
  background: url("../images/background.jpg") no-repeat center;
  background-size:100%;
  overflow:hidden;
}
.regBoxMain{
  width:350px;
  margin:100px auto;
}
</style>