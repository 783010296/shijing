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
.block h3{
	text-align:center;
	margin:150px;
	font-size:90px;
}
.el-carousel__arrow{
	height:100px;
	width:100px;
	font-size:40px;
}
.el-carousel__arrow--left{
	left:120px;
}
.el-carousel__arrow--right{
	right:120px;
}
</style>