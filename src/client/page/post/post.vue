<template>
	<div>
		<head-Top></head-Top>
		<div id="onePost">
			<h3>{{post.title}}</h3>
			<div>
				<span>作者：{{post.author}}</span>
				<span>时间：{{post.time}}</span>
				<span>访问量：{{post.pv}}</span>
			</div>
			<div v-html="post.post"></div>
		</div>
	</div>
</template>


<script>
	import headTop from '../../components/head'
	import { postFindOne } from '../../service/getData'
	export default {
		data(){
			return {
				post:{}
			}
		},
		components:{
			headTop
		},
		mounted(){
			postFindOne(this.$route.params.code).then(post=>{
				this.post = post.posts

			}).catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style>
#onePost{
	width:1000px;
	margin:0 auto;
}
#onePost h3{
	text-align:center;
}
#onePost>div:nth-child(2){
	padding:10px;
	display:flex;
}
#onePost>div:nth-child(2) span{
	flex:1;
	text-align:center;
}
#onePost pre{
	border:1px solid black;
}
</style>