<template>
	<div>
		<head-top></head-top>
		<div id="notfound">
			<h1>Not Found</h1>
			<h1>咦~找不到哦</h1>
		</div>
	</div>
</template>

<script>
	import headTop from '../../components/head'
	export default {
		name:'notfound',
		data(){
			return {

			}
		},
		components:{
			headTop
		},
	}
</script>

<style>
#notfound{
	text-align:center;
	margin-top:50px;
}
</style>