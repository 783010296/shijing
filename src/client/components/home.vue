<template>
	<div class="block">
		<el-carousel trigger="click" height="400px">
			<el-carousel-item v-for="(color,index) in colors" :key="color" :style='{background:color}'>
				<h3>{{ color }}</h3>
				<h3>{{ index }}</h3>
			</el-carousel-item>
		</el-carousel>
		<el-row class="homeImgBox" :gutter="20">
		  <el-col :span="6" v-for="(o, index) in imgArr" :key="o" tag="a" :href="'#/'+o">
		    <el-card :body-style="{ padding: '0px' }">
		      <img :src="'/static/'+o+'.jpg'" class="image">
		      <div style="padding: 14px;">
		        <span>{{o | initTitle}}</span>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name:"home",
	data(){
		return {
			colors:['#E5E9F2','#D3DCE6','#C0CCDA','#99A9BF'],
			imgArr:['es6','nodejs','vuejs','reactjs']
		}
	},
	filters:{
		initTitle(value){
			return value.toUpperCase()
		}
	}
}
</script>

<style>
.block h3{
	text-align:center;
	margin:50px;
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
.el-carousel__button{
	width:50px;
}
.homeImgBox{
	width:1000px;
	margin:0 auto!important;
	padding-top:30px;
}
.homeImgBox img{
	width:230px;
}
</style>