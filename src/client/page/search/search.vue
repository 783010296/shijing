<template>
	<div>
		<head-top></head-top>
		<h1>{{result}}的搜索结果是</h1>
	</div>
</template>

<script>
	import headTop from '../../components/head'
	export default {
		name:'search',
		data:function(){
			return {
			}
		},
		computed:{
			result(){
				return this.$route.query.keyword
			}
		},
		components:{
			headTop
		}
	}
</script>