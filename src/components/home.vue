<template>
	<div class="block">
		<el-carousel trigger="click" height="400px">
			<el-carousel-item v-for="color in colors" :key="color" :style='{background:color}'>
				<h3>{{ color }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
export default {
	name:"home",
	data(){
	return {
		colors:['#E5E9F2','#D3DCE6','#C0CCDA','#99A9BF']
	}
	}
}
</script>

<style>
.block{
	border:1px solid #E5E9F2;
}
.block h3{
	text-align:center;
	margin:150px;
	font-size:90px;
}
</style>