<template>
	<div>
		<head-Top></head-Top>
		<div id="more33">
			<el-form ref="post" label-position="top" :model="post" label-width="800px">
				<el-form-item label="文章标题">
					<el-input v-model="post.title"></el-input>
				</el-form-item>
				<el-form-item label="文章内容">
			    <el-input type="textarea" v-model="post.post" :rows="13"></el-input>
			  </el-form-item>
				<el-form-item>
			    <el-button type="primary" @click="onSubmit">发布</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/head'
	import { addPost } from '../../service/getData'
	export default {
		data(){
			return {
				post:{
					title:"",
					post:""
				}

			}
		},
		methods:{
			onSubmit(){
				let _this = this
				addPost(_this.post).then((post)=>{
					console.log(post)
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
		components:{
			headTop
		}
	}

</script>

<style>
#more33{
	width:1000px;
	margin:0 auto;
	margin-top:15px;
	margin-bottom:30px;
}

</style>